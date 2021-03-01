import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ConfigService } from '../../shared/config.service';
import { StoreCalendar } from '../models/StoreCalendar';
import { StoreCalendarRequest } from '../models/StoreCalendarRequest';

@Injectable({
  providedIn: 'root'
})
export class CalendarClient {
  constructor(private configService: ConfigService, private http: HttpClient) { }

  public  UpdateCalendar(storeCalendar: StoreCalendar) {
    return  this.http.post(`${environment.calendarApiURI}/StoreCalendar/update`, storeCalendar, {
               headers: this.configService.buildHeaderRequest()
           });
  }

  public  GetCalendar(request: StoreCalendarRequest) {
    return  this.http.post<StoreCalendar>(`${environment.calendarApiURI}/StoreCalendar/get`, request, {
               headers: this.configService.buildHeaderRequest()
           });
  }
}
