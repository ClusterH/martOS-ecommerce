import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import * as _ from 'lodash';

import { Store as _Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromProducts from 'src/app/smart-stores/products/@store/products';
import { Observable, Subject } from 'rxjs';

import { Product, TagType, Tag, TagAttribute } from '../../models';
import { TagsClient } from 'src/app/smart-stores/clients/TagsClient';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss', '../products/products.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  public tags$: Observable<Tag[]>;
  public isLoading$: Observable<any>;

  public tagType = TagType;

  public displayedColumns: string[];
  public subcategoryDisplayedColumns: string[];

  public dataSource: MatTableDataSource<Product>;

  private unsubscribe$: Subject<void> = new Subject();
  subCategories: TagAttribute[] = [];
  currentTag: Tag;

  constructor(public store: _Store<fromRoot.State>, public router: Router, private tagsClient: TagsClient) {
    this.tags$ = this.store.pipe(select(fromProducts.selectTags));
    this.isLoading$ = this.store.pipe(select(fromProducts.selectLoading));

    this.displayedColumns = ['status', 'name', 'actions'];
    this.subcategoryDisplayedColumns = ['id', 'name'];
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories(): void {
   
    // this.tagsClient.getAll(this.tagType.Category);
     this.store.dispatch(new fromProducts.LoadTags(this.tagType.Category));
  }

  onUpdate(tag: Tag): void {
    console.log({ tag });
    this.router.navigateByUrl('/products/categories/edit/' + tag.id);
  }

  onDelete(tag: Tag): void {
    this.store.dispatch(new fromProducts.DeleteTag(tag.id));
  }
  onView(tag: Tag) {

    this.tagsClient.getByTagId(tag.id).subscribe(next => {
      this.currentTag = { ...tag };
      this.subCategories = [];
      next.forEach(subCat => {
        const subCatValue: TagAttribute = {
          id: subCat.id,
          name: subCat.value,
        };
        this.subCategories.push(subCatValue);
        this.subCategories = [...this.subCategories];
      });
    });
  }

  onStatusChange(): void {

  }

  async insert() {
    let categoryDetailLink = '/products/create/' + 0;
    this.router.navigate([categoryDetailLink]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
