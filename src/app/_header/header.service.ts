import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public comboBoxLocked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
}
