import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Store } from 'src/app/smart-stores/models/Store';
import { ConfigService } from '../../shared/config.service';

@Injectable({
  providedIn: 'root'
})

export class StoresService {
  private configService: ConfigService;

  constructor(private httpClient: HttpClient, configService: ConfigService) {
    this.configService = configService;
  }

  public getAll() {
    return this.httpClient.get<Store[]>(`${environment.dataStoreApiURI}/stores/GetAll`, {
      headers: this.configService.buildHeaderRequest()
    });
  }
}
