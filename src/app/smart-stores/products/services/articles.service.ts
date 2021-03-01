import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SearchAnyRequest, ArticlesOverall, Article } from '../models';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../../../shared/config.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  constructor(private configService: ConfigService, private http: HttpClient) { }

  public getGroupedArticles(request: SearchAnyRequest) {
    return this.http.post<ArticlesOverall[]>(`${environment.dataStoreApiURI}/GroupedArticles/searchGrouped`, request);
  }

  public getArticlesByIds(articleIds: number[]) {
    return this.http.post<Article[]>(`${environment.dataStoreApiURI}/GroupedArticles/ids`, { articleIds });
  }
}
