import { OnInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TagsClient } from '../../../../clients/TagsClient';
import { Tag, TagType, TagAttribute, SubCategoryReq } from '../../../models/tag.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-details',
  templateUrl: './categoryDetails.component.html',
  styleUrls: ['./categoryDetails.component.scss']
})

export class CategoryDetailsComponent implements OnInit, OnDestroy {
  tags: Tag[];
  redirect = '/products/categories';
  tagForm: FormGroup;
  subCategory = '';
  subCategories: TagAttribute[] = [];
  tagsSubscription: Subscription;

  private readonly router: Router;
  private readonly activatedRouter: ActivatedRoute;
  private readonly tagsClient: TagsClient;
  constructor(
    tagsClient: TagsClient,
    activatedRouter: ActivatedRoute,
    router: Router) {
    this.tagsClient = tagsClient;
    this.activatedRouter = activatedRouter;
    this.router = router;
  }

  ngOnDestroy(){
    if(this.tagsSubscription){
      this.tagsSubscription.unsubscribe();
    }
    
    this.tagsClient.changeState(null);
  }

  ngOnInit() {
    this.tagForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', Validators.required)
    });
    console.log(this.tagForm.value);
    this.activatedRouter.params.subscribe(
      params => {
        if (+params['id'] > 0) {
          this.tagForm.get('id').setValue(+params['id']);
        }
      });

    this.tagsSubscription = this.tagsClient.currentTags.subscribe(res => this.tags = res);

    if (this.tagForm.get('id').value && this.tagForm.get('id').value > 0) {
      this.tagsClient.getById(this.tagForm.get('id').value).subscribe(val => {
        this.tagForm.patchValue(this.tagsClient.buildTag(val));
      });
      this.tagsClient.getByTagId(this.tagForm.get('id').value).subscribe(next => {
        console.log({ next });
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
  }

  cancel() {
    this.router.navigate([this.redirect]);
  }

  save() {
    const tag = this.tagForm.value;
    console.log({ tag });
    this.tagForm.markAllAsTouched();
    if (this.tagForm.invalid) {
      return;
    }
    if (tag.id !== 0) {
      this.tagsClient.Update(tag);
      if (this.tags && this.tags.length > 0) {
        this.tags.forEach(cat => {
          if (tag.id === cat.id) {
            cat.name = tag.name;
          }
        });
      }
    } else {
      tag.tagType = TagType.Category;
      this.tagsClient.insert(tag).subscribe(val => {
        tag.id = val;
      });

      if (!this.tags) {
        this.tags = [tag];
      } else {
        this.tags.push(tag);
      }
    }
    this.tagsClient.changeState(this.tags);
    // console.log('this.tags',this.tags)
    this.router.navigate([this.redirect]);
  }
  AddSubCategory() {
    if (this.subCategory !== '') {
      const tagAttibute: SubCategoryReq = {
        categoryId: this.tagForm.get('id').value,
        subCatName: this.subCategory
      };
      this.tagsClient.addTabAttributes(tagAttibute).subscribe(next => {
        console.log({ next });
        const subcategoryResponse: TagAttribute = {
          id: 0,
          name: this.subCategory
        };
        this.subCategories.push(subcategoryResponse);
        this.subCategories = [...this.subCategories];
        this.subCategory = '';
      });
    }

  }
}
