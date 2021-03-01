import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { TagAttribute } from '../products/models/tag.model';
import { ConfigService } from '../../shared/config.service';

@Injectable({
  providedIn: 'root'
})
export class TagAttributesClient {
  attributesUrl: string;
  attributes: TagAttribute[];
  private state$ = new BehaviorSubject<TagAttribute[]>(this.attributes);
  currentTags = this.state$.asObservable();

  private configService: ConfigService;
  constructor(private httpClient: HttpClient,
    configService: ConfigService) {
    this.configService = configService;
    this.attributesUrl = `${this.configService.dataStoreApiURI}/tagattributes`;
  }

  public async getByTagId(tagId: number) {
    return await this.httpClient.get<TagAttribute[]>(`${this.attributesUrl}/GetByTagId/${tagId}`, {
      headers: this.configService.buildHeaderRequest()
    });
  }

  changeState(attributes: TagAttribute[]) {
    this.state$.next(attributes);
  }
}
