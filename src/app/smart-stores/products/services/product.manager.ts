import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tag, TagAttribute } from '../models/tag.model';
import { Images } from '../models';
import { PresImage } from '../models/presimage.model';

@Injectable({
  providedIn: 'root'
})
export class ProductManager {
  attributes : TagAttribute[];
  private attributes$ = new BehaviorSubject<TagAttribute[]>(this.attributes);
  currentattributes = this.attributes$.asObservable();
  
  public optionsToDelete : Tag[] = [];
  // private optionsToDelete$ = new BehaviorSubject<string[]>(this.optionsToDelete);
  // currentoptionsToDelete = this.optionsToDelete$.asObservable();

  public optionsToAdd : Tag[] = [];
  // private optionsToAdd$ = new BehaviorSubject<string[]>(this.optionsToAdd);
  // currentoptionsToAdd = this.optionsToDelete$.asObservable();

  createdImage : PresImage;
  private createdImage$ = new BehaviorSubject<PresImage>(this.createdImage);
  currentcreatedImage = this.createdImage$.asObservable();
  
  constructor() { }

  
  changeattributes(request : TagAttribute[]) {
    this.attributes$.next(request);
  }

  // changeoptionsToDelete(options : string[]) {
  //   this.optionsToDelete$.next(options);
  // }

  // changeoptionsToAdd(options : string[]) {
  //   this.optionsToAdd$.next(options);
  // }

  changecreatedImage(image : PresImage) {
    this.createdImage$.next(image);
  }
}
