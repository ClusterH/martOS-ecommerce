import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from 'src/app/_header/header.service';

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.component.html',
  styleUrls: ['./my-store.component.scss']
})
export class MyStoreComponent implements OnInit, OnDestroy {

  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.comboBoxLocked.next(true);
  }
  ngOnDestroy() {
    this.headerService.comboBoxLocked.next(false);
  }

}
