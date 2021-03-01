import { OnInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TagsClient } from '../../../../clients/TagsClient';
import { Tag, TagType } from '../../../models/tag.model';

@Component({
  selector: 'information-details',
  templateUrl: './infoDetails.component.html',
  styleUrls: ['./infoDetails.component.css']
})

export class InformationDetailsComponent implements OnInit, OnDestroy {
  tag: Tag;
  tags: Tag[] = [];
  tagId: number;
  redirect:string = '/informations';
  tagsSubscription: Subscription;

  private readonly router: Router;
  private readonly activatedRouter : ActivatedRoute;
  private readonly tagsClient : TagsClient;
  constructor(
    tagsClient : TagsClient,
    activatedRouter : ActivatedRoute,
    router: Router) { 
      this.tagsClient = tagsClient;
      this.activatedRouter = activatedRouter;
      this.router = router; 
  }

  async ngOnInit() {
    this.tagsSubscription = this.tagsClient.currentTags.subscribe(
      res => this.tags = res);

     this.activatedRouter.params.subscribe(
       params => {   
       this.tagId = params['id']
     });

     if (this.tagId != 0) {
        (await this.tagsClient.getById(this.tagId)).subscribe(val => {
            this.tag = val;
            this.tagsClient.buildTag(this.tag)
           });    
     }
     else
     {
        this.tag = <Tag>({
            id: 0,
            name: "",
         });
     }
  }
 
  ngOnDestroy(){
    if(this.tagsSubscription){
      this.tagsSubscription.unsubscribe();
    }

     this.tagsClient.changeState(null);
  }

  cancel(){
    this.router.navigate([this.redirect]);
  }

  async save(tag: Tag){
      if (tag.id != 0) {
        await this.tagsClient.Update(tag);  

        this.tags.forEach(cat => {
          if (tag.id === cat.id) { 
            cat.name = tag.name;
          }});   
      }
      else
      {
        tag.type = TagType.Information;
        (await this.tagsClient.insert(tag)).subscribe(val => {
          tag.id = val;
         });    

        if(this.tags === undefined)
        {
          this.tags = [tag];
        }  
        else{
          this.tags.push(tag);
        }
      }
      this.tagsClient.changeState(this.tags);
      this.router.navigate([this.redirect]);
  }
}