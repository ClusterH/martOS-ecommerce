import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth.service';
import { AccountService } from '../../smart-stores/services/AccountService';
import { CreateAccountRequest } from '../../smart-stores/requests/CreateAccountRequest';
import { Subscriptions } from '../../smart-stores/models/Subscriptions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit {
  accountRequest: CreateAccountRequest;
  accountSubscription: Subscription;

    constructor(
      private http: HttpClient,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private formBuilder: FormBuilder,
      private spinner: NgxSpinnerService,
      private accountService: AccountService
    ) { }

    landingData = {
      email: '',
      password: '',
      confirm_password: '',
      plan_detail: {}
    };

    ngOnInit() {
        var landingData_temp = JSON.parse(localStorage.getItem('landingData'));
        // console.log('landingData_temp', landingData_temp);

        if(landingData_temp == null){
          this.router.navigate(["/"]);
        }

        this.landingData = landingData_temp;
        this.landingData.plan_detail = {};
    }

    selectPlan(plan_name, price, currency, time){

        let detail = {
          plan_name: plan_name,
          price: price,
          currency: currency,
          time: time
        };

        this.accountSubscription = this.accountService.currentRequest.subscribe(async val => {
          this.accountRequest = val;
        });
        
        var priceNum: number = +price;
        this.accountRequest.subscription = <Subscriptions>
        {
          price: priceNum,
          type: plan_name
        };
        
        console.log("////////////////////////////////")
        console.log(this.accountRequest)
        this.accountService.changeAccount(this.accountRequest);

        this.landingData.plan_detail = detail;
        localStorage.setItem('landingData', JSON.stringify(this.landingData));
        this.router.navigate(["/register"]);
    }
  }
