import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { UserStaffRequest } from '../models/user-staff-request.model';
import { UserStaff } from '../models/user-staff.model';
import { Observable } from 'rxjs';
import {UserStaffStoreRequestModule} from '../models/user-staff-store-request.module';
import { ConfigService } from '../../shared/config.service';

@Injectable({
  providedIn: 'root'
})
export class StaffManagementService {
  constructor(private configService: ConfigService, private http: HttpClient) { }

  public getUsersStaff(referenceStoreId: string, country: string): Observable<UserStaff[]> {
    let body = { referenceStoreId: referenceStoreId, country: country };
    return this.http.post<UserStaff[]>(`${environment.dataStoreApiURI}/Users/getAll`, body, {
      headers: this.configService.buildHeaderRequest()
    });
  }

  public getUserDetailById(id: string) {
    return this.http.get<UserStaff>(`${environment.dataStoreApiURI}/Users/${id}`);
  }

  public createStaff(request: UserStaffRequest) {
    return this.http.post<UserStaffRequest>(`${environment.dataStoreApiURI}/Users/create`, request);
  }

  public updateUserStaff(request: UserStaffRequest) {
    return this.http.post<UserStaffRequest>(`${environment.dataStoreApiURI}/Users/update`, request);
  }
  public addUserStores(request: UserStaffStoreRequestModule) {
    return this.http.post<UserStaffStoreRequestModule>(`${environment.dataStoreApiURI}/Users/addUserStores`, request);
  }
  public deleteUserStores(request: UserStaffStoreRequestModule) {
    return this.http.post<UserStaffStoreRequestModule>(`${environment.dataStoreApiURI}/Users/delete`, request);
  }
  public revokeUserStores(userId) {
    const body = {
      userId
    };
    return this.http.post(`${environment.dataStoreApiURI}/Users/revoke`, body);
  }
  public enableUserStores(userId) {
    const body = {
      userId
    };
    return this.http.post(`${environment.dataStoreApiURI}/Users/enable`, body);
  }
}
