import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {

    public landingData = new Subject();

    constructor() { }
  }
