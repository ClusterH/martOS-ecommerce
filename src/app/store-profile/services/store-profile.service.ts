import { Injectable } from '@angular/core';
import { throwError, Observable, Subject, BehaviorSubject } from 'rxjs';
import { CardInfo } from '../models/CardInfo';
import { ChainStore } from '../models/ChainStore';
import { BusinessAddress } from '../models/BusinessAddress';
import { Store } from '../../smart-stores/models/Store';

@Injectable({
  providedIn: 'root'
})
export class StoreProfileService {

  closeModalService = new Subject();
  closeChainUpdateModalService = new Subject();
  addStoreModalService = new Subject();
  closeStoreUpdateModalService = new Subject();

  cardInfo : CardInfo;
  private cardInfo$ = new BehaviorSubject<CardInfo>(this.cardInfo);
  currentCardInfo = this.cardInfo$.asObservable();

  chainStores : ChainStore[];
  private chainStores$ = new BehaviorSubject<ChainStore[]>(this.chainStores);
  currentChainStores = this.chainStores$.asObservable();

  chainStore : ChainStore;
  private chainStore$ = new BehaviorSubject<ChainStore>(this.chainStore);
  currentChainStore = this.chainStore$.asObservable();

  stores : Store[];
  private stores$ = new BehaviorSubject<Store[]>(this.stores);
  currentStores = this.stores$.asObservable();

  store : Store;
  private store$ = new BehaviorSubject<Store>(null);
  currentStore = this.store$.asObservable();

  businessAddress : BusinessAddress;
  private businessAddress$ = new BehaviorSubject<BusinessAddress>(this.businessAddress);
  currentBusinessAddress = this.businessAddress$.asObservable();

  constructor() { }

  changecard(cardInfo : CardInfo) {
    this.cardInfo$.next(cardInfo);
  }

  changechains(chainStores : ChainStore[]) {
    this.chainStores$.next(chainStores);
  }

  changechain(chainStore : ChainStore) {
    this.chainStore$.next(chainStore);
  }

  changestores(stores : Store[]) {
    this.stores$.next(stores);
  }

  changestore(store : Store) {
    this.store$.next(store);
  }

  changeBusinesAddress(businessAddress : BusinessAddress) {
    this.businessAddress$.next(businessAddress);
  }
}
