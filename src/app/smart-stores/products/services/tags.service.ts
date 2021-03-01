import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Tag, TagType, TagAttribute } from '../models';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../../../shared/config.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  constructor(private configService: ConfigService, private http: HttpClient) { }

  public getTagsById(id: number) {
    return this.http.get<Tag>(`${environment.dataStoreApiURI}/tags/${id}`);
  }

  public getAttributesByTagId(id: number) {
    return this.http.get<TagAttribute[]>(`${environment.dataStoreApiURI}/tagattributes/GetByTagId/${id}`);
  }

  public getTagsByType(type: TagType) {
    return this.http.get<Tag[]>(`${environment.dataStoreApiURI}/tags/GetAll/${type}`, {
      headers: this.configService.buildHeaderRequest()
    });
  }

  public addTag(tag: Tag) {
    return this.http.post<number>(`${environment.dataStoreApiURI}/tags`, tag, {
      headers: this.configService.buildHeaderRequest()
    });
  }

  public updateTag(tag: Tag) {
    return this.http.put(`${environment.dataStoreApiURI}/tags`, tag, {
      headers: this.configService.buildHeaderRequest()
    });
  }

  public deleteTag(id: number) {
    return this.http.delete(`${environment.dataStoreApiURI}/tags/${id}`, {
      headers: this.configService.buildHeaderRequest()
    });
  }

  public searchTag(name: string, type: TagType) {
    return this.http.get<Tag[]>(`${environment.dataStoreApiURI}/tags/search/${name}&${type}`, {
      headers: this.configService.buildHeaderRequest()
    });
  }
}
