import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddImageStore, Store } from '../models/Store';
import { ConfigService } from '../../shared/config.service';
import { StoreRequest } from '../../store-profile/models/StoreRequest';
import { UpdateStoreNameRequest } from '../../store-profile/models/UpdateStoreNameRequest';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class StoresClient {
  storesUrl: string;
  currentEditStore: Subject<number> = new Subject<number>();
  private configService: ConfigService;
  constructor(
    private httpClient: HttpClient,
    configService: ConfigService
  ) {
    this.configService = configService;
    this.storesUrl = `${this.configService.dataStoreApiURI}/stores`;
  }

  public async getAll() {
    return await this.httpClient.get<Store[]>(`${this.storesUrl}/GetAll`, {
      headers: this.configService.buildHeaderRequest()
    });
  }


  public async getComplete() {
    return await this.httpClient.get<Store[]>(`${this.storesUrl}/getcomplete`, {
      headers: this.configService.buildHeaderRequest()
    });
  }

  public async create(request: StoreRequest) {
    return await this.httpClient.post<Store>(`${this.storesUrl}`, request, {
      headers: this.configService.buildHeaderRequest()
    });
  }

  public async addStoreImage(request: AddImageStore) {
    return await this.httpClient.post(`${environment.storageApiURI}/StoresImages/upload`, request, {
      headers: this.configService.buildHeaderRequest()
    });
  }

  public async updateName(request: UpdateStoreNameRequest) {
    return await this.httpClient.post(`${this.storesUrl}/updatename`, request, {
      headers: this.configService.buildHeaderRequest()
    });
  }
}
