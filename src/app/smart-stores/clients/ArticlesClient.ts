// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { SearchAnyRequest } from '../requests/SearchAnyRequest';
// import { ConfigService } from '../Services/ConfigService';
// import { GetByIdsRequest } from '../requests/GetByIdsRequest';

// @Injectable({
//   providedIn: 'root'
// })

// export class ArticlesClient {
//     articleUrl:string;

//     private configService: ConfigService;
//   constructor(private httpClient: HttpClient,
//     configService: ConfigService) {
//       this.configService = configService;
//       this.articleUrl = `${this.configService.dataStoreApiURI}/GroupedArticles`;
//     }

//   public async getById(id:number){
//     return await this.httpClient.get<Article>(`${this.articleUrl}/${id}`, {
//       headers: this.configService.buildHeaderRequest()
//   });
//   }

//   public async GetByIds(request:GetByIdsRequest){
//     return await this.httpClient.post<Article[]>(`${this.articleUrl}/ids`, request);
//   }
  
//   public async GetProductsByItemId(id:number){
//     return await this.httpClient.get<ArticlesOverall>(`${this.articleUrl}/byItemId/${id}`, {
//       headers: this.configService.buildHeaderRequest()
//   });
//   }

//   public async GetOverallProductsByItemId(id:number){
//     return await this.httpClient.get<ArticlesOverall[]>(`${this.articleUrl}/OverallByItemId/${id}`, {
//       headers: this.configService.buildHeaderRequest()
//   });
//   }
  
//   public async GetAllOverall(){
//     return await this.httpClient.get<ArticlesOverall[]>(`${this.articleUrl}/GetAll`, {
//       headers: this.configService.buildHeaderRequest()
//   });
//   }

//   public async insert(article: Article){
//     return await this.httpClient.post(`${this.articleUrl}`, article, {
//       headers: this.configService.buildHeaderRequest()
//   });
//   }

//   public async Update(request: Article){
//     return await this.httpClient.put(`${this.articleUrl}`, request, {
//       headers: this.configService.buildHeaderRequest()
//   });
//   }

//   public async Delete(id: number){
//     return await this.httpClient.delete(`${this.articleUrl}/${id}`, {
//       headers: this.configService.buildHeaderRequest()
//   });
//   }

//   public async search(request: SearchAnyRequest){
//     return await this.httpClient.post<Article[]>(`${this.articleUrl}/search`, request, {
//       headers: this.configService.buildHeaderRequest()
//   });
//   }
               
//   public async searchGroupedArticles(request: SearchAnyRequest){
//     return await this.httpClient.post<ArticlesOverall[]>(`${this.articleUrl}/searchGrouped`, request, {
//       headers: this.configService.buildHeaderRequest()
//   });
// }
// }
