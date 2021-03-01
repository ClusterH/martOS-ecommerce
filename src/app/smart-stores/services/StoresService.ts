import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Injectable } from '@angular/core';
import { Store } from "../models/Store";

@Injectable()
export class StoresService {
  
  store : Store;
  private store$ = new BehaviorSubject<Store>(this.store);
  currentStore = this.store$.asObservable();

  constructor() {}

  changeStore(store : Store){
    this.store$.next(store);
  }
}
