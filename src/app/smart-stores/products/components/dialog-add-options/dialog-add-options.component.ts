import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import * as _ from 'lodash';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromProducts from 'src/app/smart-stores/products/@store/products';
import { Observable, Subject } from 'rxjs';

import { TagsClient } from '../../../clients/TagsClient';
import { Tag, TagType, TagAttribute } from '../../models/tag.model';
import { take, tap, takeUntil } from 'rxjs/operators';
import { ProductManager } from '../../services/product.manager';

@Component({
  selector: 'app-dialog-add-options',
  templateUrl: './dialog-add-options.component.html',
  styleUrls: ['./dialog-add-options.component.scss']
})
export class DialogAddOptionsComponent implements OnInit, OnDestroy {
  public options: Tag[];
  public isLoading$: Observable<any>;
  public tagType = TagType;

  public optionsForm: FormArray;
  public newOptionFormControl: FormControl;
  public isNew: boolean;
  public editOptions: number[] = [];
  public deleteOptions: number[] = [];
  private unsubscribe$: Subject<void> = new Subject();

  private options$: Observable<Tag[]>;
  private readonly tagsClient: TagsClient;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private dialogRef: MatDialogRef<DialogAddOptionsComponent>,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>,
    private productManager : ProductManager,
    tagsClient: TagsClient,
  ) {
    this.options$ = this.store.pipe(select(fromProducts.selectOptions));
    this.isLoading$ = this.store.pipe(select(fromProducts.selectLoading));
    this.optionsForm = new FormArray([]);
    this.options = [];
    this.tagsClient = tagsClient;

 }

  ngOnInit() {
    setTimeout(() => {
      this.loadOptions();
      this.filterOptions();  
    }, 100);
  }


  loadOptions(): void {
    this.store.dispatch(new fromProducts.LoadOptions());
  }

  addOption(): void {
    this.newOptionFormControl = new FormControl('');
    this.isNew = true;
  }


  deleteOption(index: number): void {
    console.log(this.optionsForm.controls[index].value);
    if(this.optionsForm.value[index].id != 0) {
      this.deleteOptions.push(this.optionsForm.value[index].id);
      this.optionsForm.controls.splice(index, 1);
      this.optionsForm.value.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  updateOption(index: number): void {
    this.optionsForm.controls[index].enable();
    this.editOptions.push(this.optionsForm.value[index].id);
  }

  insertOption(): void {
    this.optionsForm.controls.push(this.fb.control({value: this.newOptionFormControl.value, disabled: true}));
    this.optionsForm.value.push({id: 0, name: this.newOptionFormControl.value});
    this.isNew = false;
    this.newOptionFormControl = null;
  }

  saveOptions(): void {
    this.optionsForm.value.forEach((item, index) => {
      item = { ...item, name:this.optionsForm.controls[index].value };
      if(item.id == 0) {
        item.tagType = TagType.Option;
        this.tagsClient.insert(item).subscribe(val => {
          item.id = val;
        });
        this.options[index] = item;
      }
      else{
        if(this.editOptions.length > 0 && _.findIndex(this.editOptions, (elem) => {return item.id === elem}) != -1){
          this.tagsClient.Update(item);
        }
        this.options[index] = item
      }
    });
    this.deleteOptions.length > 0 && this.deleteOptions.forEach(elem => {
      this.tagsClient.Delete(elem);
    });

    this.tagsClient.changeState(this.options);
    this.isLoading$.pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      if(!res.tags) {
        this.dialogRef.close('success');
      }
    })
  }

  filterOptions(): void {
    this.options$.pipe(take(1)).subscribe(options => {
      options.map((item, index) => {
        if(item.name !== 'Edit options' && item.name !== 'Edit option' && item.name !== 'edit options' && item.name !== 'edit option') {
          this.optionsForm.controls.push(this.fb.control({value: item.name, disabled: true}));
          this.optionsForm.value.push(item);
        }
      })
    });
  }

}


