import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserStaff } from '../../staff-management/models/user-staff.model';
import { UserStaffRequest } from '../../staff-management/models/user-staff-request.model';
import { BusinessAddress } from '../models/BusinessAddress';

@Injectable({
  providedIn: 'root'
})
export class UserClient {
  constructor(private http: HttpClient) { }

  public getUserDetails(country: string): Observable<UserStaff> {
    return this.http.get<UserStaff>(`${environment.dataStoreApiURI}/Users/${country}`);
  }

  public getInfoNoImage(): Observable<UserStaff> {
    return this.http.get<UserStaff>(`${environment.dataStoreApiURI}/Users/getinfonoimage`);
  }

  public updateUserStaff(request: UserStaffRequest) {
    return this.http.post<UserStaffRequest>(`${environment.dataStoreApiURI}/Users/update`, request);
  }

  public getBusinessAddress() {
    return this.http.get<BusinessAddress>(`${environment.dataStoreApiURI}/Users`);
  }
  public getStoredBusinessAddress() {
    console.log('get business address');
    const localBusinessAddress = localStorage.getItem('businessAddress');
    if (localBusinessAddress) {
      return JSON.parse(localBusinessAddress);
    } else {
      this.getBusinessAddress().subscribe(next => {
        const newlocalBusinessAddress = JSON.stringify(next);
        localStorage.setItem('businessAddress', newlocalBusinessAddress);
        return next;
      });
    }
  }
}
