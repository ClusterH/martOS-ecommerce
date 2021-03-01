import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ConfigService } from '../../shared/config.service';
import { ChainStore } from '../models/ChainStore';
import { GetChainByIdRequest } from '../models/GetChainByIdRequest';

@Injectable({
  providedIn: 'root'
})
export class ChainStoresClient {
  chainStores: ChainStore[];
  constructor(private configService: ConfigService, private http: HttpClient) { }

  public getAll() {
    return this.http.get<ChainStore[]>(`${environment.dataStoreApiURI}/ChainStore`, {
      headers: this.configService.buildHeaderRequest()
    });
  }

  public create(request: ChainStore) {
    return this.http.post(`${environment.dataStoreApiURI}/ChainStore`, request, {
      headers: this.configService.buildHeaderRequest()
    });
  }

  public update(request: ChainStore) {
    return this.http.put(`${environment.dataStoreApiURI}/ChainStore`, request, {
      headers: this.configService.buildHeaderRequest()
    });
  }

  public delete(request: GetChainByIdRequest) {
    return this.http.post(`${environment.dataStoreApiURI}/ChainStore/delete`, request, {
      headers: this.configService.buildHeaderRequest()
    });
  }
}
