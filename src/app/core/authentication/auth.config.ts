import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
 
@Injectable()
export class AuthConfig {    
 
    get authApiURI() {
      return 'http://51.140.48.107:8080/api';
    }
 
    get dataStoreApiURI() {
      return 'http://23.100.50.205:5000/api';
    }
}