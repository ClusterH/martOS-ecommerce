import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CreateAccountRequest } from '../requests/CreateAccountRequest';

@Injectable({
    providedIn: 'root'
  })
  
export class AccountService {
  
  request : CreateAccountRequest;
  private accountRequest$ = new BehaviorSubject<CreateAccountRequest>(this.request);
  currentRequest = this.accountRequest$.asObservable();

  constructor() {}

  changeAccount(request : CreateAccountRequest){
    this.accountRequest$.next(request);
  }
} 