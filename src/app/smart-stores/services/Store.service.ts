import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from '../models/Store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }
  store: Store;
  public selectedStore = new BehaviorSubject<Store>(this.store);

}
