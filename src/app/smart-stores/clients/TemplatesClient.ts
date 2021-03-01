// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { UpdateItemRequest } from '../requests/UpdateItemRequest';
// import { Item } from '../models/Item';
// import { SearchAnyRequest } from '../requests/SearchAnyRequest';
// import { ConfigService } from '../Services/ConfigService';
// import { SendOnlineRequest } from '../requests/SendOnlineRequest';

// @Injectable({
//   providedIn: 'root'
// })
// export class TemplatesClient {
//     itemUrl:string;

//     private configService: ConfigService;
//   constructor(private httpClient: HttpClient, 
//     configService: ConfigService) {
//       this.configService = configService;
//       this.itemUrl = `${this.configService.dataStoreApiURI}/Items`;
//     }
  
//   public async getById(id:number){
//     return await this.httpClient.get<Item>(`${this.itemUrl}/${id}`);
//   }

//   public async GetAllByStoreId(storeId:number){
//     return await this.httpClient.get<Item[]>(`${this.itemUrl}/GetAll/${storeId}`);
//   }

//   public async search(request: SearchAnyRequest){
//     return await this.httpClient.post<Item[]>(`${this.itemUrl}/search`, request);
//   }

//   public async insert(item: Item){
//     return await this.httpClient.post(`${this.itemUrl}`, item);
//   }

//   public async PutOnline(request: SendOnlineRequest){
//     console.log(request)
//     await this.httpClient.post<SendOnlineRequest>(`${this.itemUrl}/online`, request).subscribe();
//   }

//   public async Update(request: UpdateItemRequest){
//     return await this.httpClient.put(`${this.itemUrl}`, request);
//   }

//   public async Delete(id: number){
//     return await this.httpClient.delete(`${this.itemUrl}/${id}`);
//   }
// }
