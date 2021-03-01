import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import * as _ from 'lodash';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromProducts from 'src/app/smart-stores/products/@store/products';
import { Observable } from 'rxjs';

import { Tag } from '../../models';
import { take } from 'rxjs/operators';
import { ProductManager } from '../../services/product.manager';

@Component({
  selector: 'app-dialog-edit-options',
  templateUrl: './dialog-edit-options.component.html',
  styleUrls: ['./dialog-edit-options.component.scss']
})
export class DialogEditOptionsComponent implements OnInit {
  public options: Tag[];

  public optionsForm: FormArray;
  public newOptionForm: FormControl;
  public isNew: boolean;
  public deleteOptions: string[] = [];

  private options$: Observable<Tag[]>;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any[], private fb: FormBuilder, private store: Store<fromRoot.State>, 
  private productManager : ProductManager) {
    this.options$ = this.store.pipe(select(fromProducts.selectOptions));
  }

  ngOnInit() {
    console.log(this.deleteOptions);
    console.log(this.data);
    this.optionsForm = this.fb.array(Object.keys(this.data));
    this.optionsForm.disable();
    this.filterOptions();
  }

  addOption(): void {
    this.newOptionForm = new FormControl('');
    this.isNew = true;
  }

  onSelectOption(): void {
    console.log(this.optionsForm)
    this.isNew = false;
    console.log(this.newOptionForm.value);
    //this.productManager.optionsToAdd.push(this.newOptionForm.value);
    this.optionsForm.controls.push(this.newOptionForm);
    this.optionsForm.updateValueAndValidity();

    this.options$.pipe(take(1)).subscribe(options => {
      console.log(this.options)
      let opt  = options.filter(opt => this.newOptionForm.value === opt.name);
      this.productManager.optionsToAdd.push.apply(this.productManager.optionsToAdd, opt)
      console.log(this.options)
    });
    this.filterOptions();
  }

  deleteOption(index: number): void {
 //   var optionValues = this.optionsForm.getRawValue();
  //  var selectedValue = optionValues[0];
    var options = this.optionsForm.getRawValue();
    var fafi = options[index]; 
    console.log(this.options);
    this.deleteOptions.push(fafi);
    console.log(this.deleteOptions);
    //this.productManager.optionsToDelete = this.deleteOptions;
    
    this.optionsForm.removeAt(index);
    this.optionsForm.updateValueAndValidity();
    console.log(this.optionsForm.getRawValue());
     
    this.options$.pipe(take(1)).subscribe(options => {
      console.log(this.options)
      let opt  = options.filter(opt => fafi === opt.name);
      this.productManager.optionsToDelete.push.apply(this.productManager.optionsToDelete, opt)
      console.log(this.options)
    });
    this.filterOptions();
  }

  filterOptions(): void {
    this.options$.pipe(take(1)).subscribe(options => {
      console.log(this.options)
      this.options = options.filter(opt => !this.optionsForm.controls.find(ctrl => ctrl.value === opt.name));
      console.log(this.options)
    });
  }
}
