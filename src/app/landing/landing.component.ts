import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { CreateAccountRequest } from '../smart-stores/requests/CreateAccountRequest';
import { User } from '../smart-stores/models/User';
import { AccountService } from '../smart-stores/services/AccountService';
import { AuthService } from '../core/authentication/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private accountService: AccountService
  ) { }

  registerForm: FormGroup;
  loginForm: FormGroup;
  errorVal: string = '';
  successVal: string = '';
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "dots": true, "arrows": false };
  modalType: string = 'register';

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/home');
    }

    let landingModalType = localStorage.getItem('landingModalType');
    // console.log('landingModalType', landingModalType);
    if (landingModalType === 'login') {
      this.modalType = 'login';
    } else {
      this.modalType = 'register';
    }
    localStorage.removeItem('landingModalType');

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: [null, [Validators.required]]
    }, { validator: this.checkIfMatchingPasswords('password', 'cpassword') });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get lndRegisterGet() {

    return this.registerForm ? this.registerForm.controls : null;
  }

  get lndLoginGet() {
    return this.loginForm ? this.loginForm.controls : null;
  }

  onSubmit() {
    var accountRequest = <CreateAccountRequest>
      {
        user: null,
        subscription: null,
        chainStore: null,
        cardDetails: null,
        business: null
      };

    let user = this.registerForm.getRawValue();
    accountRequest.user = <User>
      {
        email: user.email,
        password: user.password
      };

    accountRequest.user.email = user.email;
    accountRequest.user.password = user.password;

    console.log(accountRequest);
    this.accountService.changeAccount(accountRequest);
    // console.log('value', this.registerForm.value);
    // this.authService.landingData.next(this.registerForm.value);
    localStorage.setItem('landingData', JSON.stringify(this.registerForm.value));
    this.router.navigate(["/cgu"]);
  }

  onLoginSubmit() {
    console.log('login');
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }
  login() {
    this.authService.login();
  }

}
