import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserInfo, ImgRequest } from '../products/models/user.model';
import { ConfigService } from 'src/app/shared/config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  baseURL = environment.dataStoreApiURI + '/Users';

  getUserInfo() {
    return this.http.post<UserInfo>(this.baseURL + '/getinfo', { country: 'France' }, {
      headers: this.configService.buildHeaderRequest()
    });
  }
  getUserImage() {
    return this.http.get(this.baseURL + '/getimage', {
      responseType: 'text'
    });
  }
  updateUserImage(request: ImgRequest) {
    return this.http.post(environment.storageApiURI + '/UserImages/upload ', request);
  }
}
