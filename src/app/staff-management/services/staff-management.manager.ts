import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserStaff } from '../models/user-staff.model';

@Injectable({
  providedIn: 'root'
})
export class StaffManager {
  users : UserStaff[];
  private users$ = new BehaviorSubject<UserStaff[]>(this.users);
  currentusers = this.users$.asObservable();

  constructor() { }

  
  changeusers(request : UserStaff[]) {
    this.users$.next(request);
  }
}
