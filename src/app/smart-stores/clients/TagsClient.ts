import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SubCategoryReq, Tag, TagAttribute, TagType } from '../products/models/tag.model';
import { ConfigService } from '../../shared/config.service';
// import { PropertyFilter } from '../models/PropertyFilter';

@Injectable({
  providedIn: 'root'
})
export class TagsClient {
  tagUrl: string;

  tags: Tag[];
  private state$ = new BehaviorSubject<Tag[]>(this.tags);
  currentTags = this.state$.asObservable();

  private configService: ConfigService;
  constructor(private httpClient: HttpClient, configService: ConfigService) {
    this.configService = configService;
    this.tagUrl = `${this.configService.dataStoreApiURI}/tags`;
  }

  public getById(id: number) {
    return this.httpClient.get<Tag>(`${this.tagUrl}/${id}`);
  }

  public getFilters() {
    return this.httpClient.get<any[]>(`${this.configService.dataStoreApiURI}/filters`, {
      headers: this.configService.buildHeaderRequest()
    });
  }

  public getAll(type: TagType) {
    this.httpClient.get<Tag[]>(`${this.tagUrl}/GetAll/${type}`, {
      headers: this.configService.buildHeaderRequest()
    }).subscribe(res => {
      this.buildAllTag(res);
      this.state$.next(res);
    })
  }

  public getAllByTagType(type: TagType) {
    return this.httpClient.get<Tag[]>(`${this.tagUrl}/GetAll/${type}`, {
      headers: this.configService.buildHeaderRequest()
    });
  }

  changeState(tags: Tag[]) {
    this.state$.next(tags);
  }

  public insert(tag: Tag) {
    return this.httpClient.post<number>(`${this.tagUrl}`, tag, {
      headers: this.configService.buildHeaderRequest()
    });
  }

  public Update(tag: Tag) {
    return this.httpClient.put(`${this.tagUrl}`, tag, {
      headers: this.configService.buildHeaderRequest()
    }).subscribe();
  }

  public Delete(id: number) {
    return this.httpClient.delete(`${this.tagUrl}/${id}`, {
      headers: this.configService.buildHeaderRequest()
    }).subscribe();
  }

  public Search(name: string, type: TagType) {
    return this.httpClient.get<Tag[]>(`${this.tagUrl}/search/${name}&${type}`, {
      headers: this.configService.buildHeaderRequest()
    });
  }

  buildAllTag(tags: Tag[]) {
    tags.forEach(tag => {
      this.buildTag(tag);
    });
  }

  buildTag(tag: Tag) {
    tag.allTemplatesLinked = '';
    tag.linkedTemplates.forEach(template => {
      tag.allTemplatesLinked = `${tag.allTemplatesLinked} ${template}`;
    });
    return tag;
  }

  addTabAttributes(subCategory: SubCategoryReq) {
    return this.httpClient.post(`${this.configService.dataStoreApiURI}/tagAttributes`, subCategory, {
      headers: this.configService.buildHeaderRequest()
    });
  }
  public  getByTagId(tagId: number) {
    return  this.httpClient.get<TagAttribute[]>(`${this.configService.dataStoreApiURI}/tagAttributes/GetByTagId/${tagId}`, {
      headers: this.configService.buildHeaderRequest()
    });
  }
}
