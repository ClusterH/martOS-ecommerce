import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { StoreProfileService } from '../../services/store-profile.service';
import { StoreCalendar } from '../../models/StoreCalendar';
import { DayStoreCalendar } from '../../models/DayStoreCalendar';
import { CalendarClient } from '../../clients/calendar.client';
import { StoreCalendarRequest } from '../../models/StoreCalendarRequest';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-store-info-days',
  templateUrl: './store-info-days.component.html',
  styleUrls: ['./store-info-days.component.scss']
})
export class StoreInfoDaysComponent implements OnInit {

  addStoreDaysForm: FormGroup;
  currentStoreSubscription: Subscription;
  request: StoreCalendarRequest = {
    country: '',
    referenceStoreId: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private storeProfileService: StoreProfileService,
    private calendarClient: CalendarClient,
    public dialogRef: MatDialogRef<StoreInfoDaysComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnDestroy() {
    if(this.currentStoreSubscription){
      this.currentStoreSubscription.unsubscribe();
    }
    
     this.storeProfileService.changestore(null);
  }

  ngOnInit() {
    this.addStoreDaysForm = new FormGroup({
      country: new FormControl(''),
      referenceStoreId: new FormControl(''),
      days: new FormArray([])
    });
    for (let i = 0; i < 7; i++) {
      const dayFromGroup = new FormGroup({
        dayOfWeek: new FormControl(i),
        openingTime: new FormControl(null),
        closingTime: new FormControl(null)
      });
      const daysArray = this.addStoreDaysForm.get('days') as FormArray;
      daysArray.setControl(i, dayFromGroup);
    }
    console.log(this.addStoreDaysForm.value);
    this.currentStoreSubscription = this.storeProfileService.currentStore.subscribe(val => {
      if (!val) {
        return;
      }
      const request: StoreCalendarRequest = {
        country: val.country,
        referenceStoreId: val.referenceId
      };
      this.request = request;
      this.addStoreDaysForm.patchValue(request);
      this.calendarClient.GetCalendar(request).subscribe((storeCaldendar) => {
        console.log({ storeCaldendar });
        this.addStoreDaysForm.patchValue(storeCaldendar);
      });

    });
  }

  addStoreDaysSubmitForm() {
    console.log('this.addStoreDaysForm', this.addStoreDaysForm.value);
    const request: StoreCalendar = this.addStoreDaysForm.value;
    this.calendarClient.UpdateCalendar(request).subscribe((user) => {
    });
    this.onNoClick();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
