import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, PropertyFilter, SearchAnyRequest, OnlineRequest, ProductRequest, Images } from '../models';
import { environment } from 'src/environments/environment';
import { UploadImagesRequest } from '../../requests/UploadImagesRequest';
import { DeleteImageRequest } from '../../requests/DeleteImageRequest';
import { DeleteProductRequest } from '../../requests/DeleteProductRequest';
import { ConfigService } from '../../../shared/config.service';
import { response } from '../models/response';
import { PresImage } from '../models/presimage.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private configService: ConfigService, private http: HttpClient) { }

  public getProducts(request: SearchAnyRequest) {
    return this.http.post<Product[]>(`${environment.dataStoreApiURI}/items/search`, request);
  }

  public  search(request: SearchAnyRequest){
    return  this.http.post<Product[]>(`${environment.dataStoreApiURI}/items/search`, request, {
      headers: this.configService.buildHeaderRequest()
  });
  }

  public getProductById(request: { id: number, storeId: number }) {
    return this.http.post<Product>(`${environment.dataStoreApiURI}/items/byId`, request);
  }

  public getGroupedArticles(request: SearchAnyRequest) {
    return this.http.post<Product[]>(`${environment.dataStoreApiURI}/articles/searchGrouped`, request);
  }

  public getFilters() {
    return this.http.get<PropertyFilter[]>(`${environment.dataStoreApiURI}/filters`, {
      headers: this.configService.buildHeaderRequest()
    });
  }

  public getFilterValues(request: PropertyFilter) {
    return this.http.post<string[]>(`${environment.dataStoreApiURI}/filters`, request, {
      headers: this.configService.buildHeaderRequest()
    });
  }

  public async setOnlineStatus(request: OnlineRequest) {
    return await this.http.post<any>(`${environment.dataStoreApiURI}/items/online`, request);
  }

  public saveProduct(request: ProductRequest) {
    return this.http.post<ProductRequest>(`${environment.dataStoreApiURI}/items`, request);
  }

  public editProduct(request: ProductRequest) {
    return this.http.put<ProductRequest>(`${environment.dataStoreApiURI}/items`, request);
  }

  public deleteProduct(request: DeleteProductRequest)  {
    return this.http.post<response>(`${environment.dataStoreApiURI}/items/delete`, request, {
      headers: this.configService.buildHeaderRequest()
    });
  }

   uploadImage(request: UploadImagesRequest) {
    return  this.http.post<PresImage>(`${environment.storageApiURI}/images/Upload`,  request);
    //request, {
     // headers: this.configService.buildHeaderRequest()
    //});
  }

   deleteImage(request: DeleteImageRequest) {
    return  this.http.post(`${environment.storageApiURI}/images/delete`,  request);
    //request, {
     // headers: this.configService.buildHeaderRequest()
    //});
  }
}
