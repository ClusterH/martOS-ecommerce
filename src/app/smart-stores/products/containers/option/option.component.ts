import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import * as _ from 'lodash';

import { Store as _Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromProducts from 'src/app/smart-stores/products/@store/products';
import { Observable, Subject } from 'rxjs';

import { Product, TagType, Tag } from '../../models';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss', '../products/products.component.scss']
})
export class OptionComponent implements OnInit, OnDestroy {
  public tags$: Observable<Tag[]>;
  public isLoading$: Observable<any>;

  public tagType = TagType;

  public displayedColumns: string[];

  public dataSource: MatTableDataSource<Product>;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(public store: _Store<fromRoot.State>, public router: Router) {
    this.tags$ = this.store.pipe(select(fromProducts.selectTags));
    this.isLoading$ = this.store.pipe(select(fromProducts.selectLoading));

    this.displayedColumns = ['status', 'name', 'actions'];
  }

  ngOnInit() {
    this.loadOptions();
  }

  loadOptions(): void {
    this.store.dispatch(new fromProducts.LoadTags(this.tagType.Option));
  }

  onUpdate(tag: Tag): void {

  }

  onDelete(tag: Tag): void {
    this.store.dispatch(new fromProducts.DeleteTag(tag.id));
  }

  onStatusChange(): void {

  }


  async insert()
  {
    let categoryDetailLink = '/products/create/'+ 0;
    this.router.navigate([categoryDetailLink]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
