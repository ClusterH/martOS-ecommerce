import { OnInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TagsClient } from '../../../clients/TagsClient';
import { Tag, TagType, TagAttribute } from '../../models/tag.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tag-details',
  templateUrl: './optionDetails.component.html',
  styleUrls: ['./optionDetails.component.scss']
})

export class OptionDetailsComponent implements OnInit, OnDestroy {
  tags: Tag[];
  redirect = '/products/options';
  tagForm: FormGroup;
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
    }
  }

  ngOnDestroy(){
    if(this.tagsSubscription){
      this.tagsSubscription.unsubscribe();
    }

     this.tagsClient.changeState(null);
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
      tag.tagType = TagType.Option;
      this.tagsClient.insert(tag).subscribe(val => {
        tag.id = val;
      });
     console.log('options')
      if (!this.tags) {
        this.tags = [tag];
      } else {
        this.tags.push(tag);
      }
    }
    this.tagsClient.changeState(this.tags);
    this.router.navigate([this.redirect]);
  }
}
