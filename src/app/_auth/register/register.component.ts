import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { Subscription } from "rxjs";
import { AccountService } from "../../smart-stores/services/AccountService";
import { AccountsClient } from "../../smart-stores/clients/AccountsClient";
import { CreateAccountRequest } from "../../smart-stores/requests/CreateAccountRequest";
import { AuthService } from "src/app/core/authentication/auth.service";
import { ImageCroppedEvent } from "ngx-image-cropper";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  accountRequest: CreateAccountRequest;
  accountSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private accountClient: AccountsClient
  ) {}

  registerForm: FormGroup;
  errorVal: string = "";
  successVal: string = "";
  stepValue: number = 1;
  landingDataSubscription: Subscription;
  landingData = {
    email: "",
    password: "",
    confirm_password: "",
    plan_detail: {
      plan_name: "",
      price: "",
      time: "",
      currency: "",
    },
  };

  imageURL: string;
  mainImage;
  hideImageCrop = true;
  imageChangedEvent;

  formSubmitted = false;
  form1Submitted = false;
  form2Submitted = false;
  form3Submitted = false;
  form4Submitted = false;
  accountCreatedSuccess = false;
  accountCreatedFailure = false;

  ngOnInit() {
    this.accountService.currentRequest.subscribe(async (val) => {
      console.log(val);
      this.accountRequest = val;
    });

    const landingData_temp = JSON.parse(localStorage.getItem("landingData"));

    if (landingData_temp == null) {
      this.router.navigate(["/"]);
    }

    this.landingData.email =
      landingData_temp.email !== "" && landingData_temp.email !== undefined
        ? landingData_temp.email
        : "";
    this.landingData.password =
      landingData_temp.password !== "" &&
      landingData_temp.password !== undefined
        ? landingData_temp.password
        : "";
    this.landingData.plan_detail = landingData_temp.plan_detail;
    localStorage.removeItem("landingData");

    this.registerForm = this.formBuilder.group({
      step1: this.formBuilder.group({
        first_name: ["", [Validators.required, Validators.minLength(2)]],
        last_name: ["", [Validators.required, Validators.minLength(2)]],
        email: [
          this.landingData.email,
          [Validators.required, Validators.email, Validators.minLength(2)],
        ],
        phone: ["", [Validators.required, Validators.pattern("^[0-9]{9,}$")]],
        password: [this.landingData.password],
      }),

      step2: this.formBuilder.group({
        company_name: ["", [Validators.required, Validators.minLength(2)]],
        n_siren: ["", [Validators.required, Validators.minLength(2)]],
        address: ["", [Validators.required, Validators.minLength(2)]],
        postal_code: [
          "",
          [Validators.required, Validators.pattern("[0-9]{5}")],
        ],
        city: ["France", [Validators.required, Validators.minLength(2)]],
      }),

      step3: this.formBuilder.group({
        image_data: [""],
        store_name: ["", [Validators.required, Validators.minLength(2)]],
        address: ["", [Validators.required, Validators.minLength(2)]],
        postal_code: [
          "",
          [Validators.required, Validators.pattern("[0-9]{5}")],
        ],
      }),

      step4: this.formBuilder.group({
        card_holder_name: ["", [Validators.required, Validators.minLength(2)]],
        card_number: ["", [Validators.required, Validators.pattern("[0-9]{16}")]],
        exp_date: ["", [Validators.required, Validators.minLength(2)]],
        CVV: ["", [Validators.required, Validators.pattern("[0-9]{3}")]],
      }),
    });
  }

  async changeNextPage(stepValue) {
    if (stepValue === 1) {
      this.form1Submitted = true;
      if (this.step1Form && this.step1Form.invalid) {
        return;
      }
      this.accountRequest.user.name = this.firstName.value;
      this.accountRequest.user.familyName = this.lastName.value;
      const phone = this.phone.value;
      this.accountRequest.user.phoneNumber = String(phone);
      this.stepValue = 3;
    } else if (stepValue === 3) {
      this.form2Submitted = true;
      if (this.step2Form && this.step2Form.invalid) {
        return;
      }
      this.accountRequest.business = {
        name: this.companyName.value,
        number: this.siren.value,
        address: this.address.value,
        countryId: 1,
        country: "France",
        postalCode: String(this.postalCode.value),
      };
      this.stepValue = 5;
    } else if (stepValue === 5) {
      this.form3Submitted = true;
      if (this.step3Form && this.step3Form.invalid) {
        return;
      }
      this.accountRequest.chainStore = {
        name: this.storeName.value,
        store: {
          imageData: this.step3Form.get('image_data').value,
          name: this.storeName.value,
          address: this.storeAddress.value,
          postalCode: String(this.storePostalCode.value),
          countryId: 1,
        },
      };
      this.stepValue = 7;
    } else if (stepValue === 7) {
      this.form4Submitted = true;
      if (this.step4Form && this.step4Form.invalid) {
        return;
      }
      const houseNumber = this.accountRequest.business.address.split("/");
      this.accountRequest.cardDetails = {
        card: {
          holderName: this.registerForm.get("step4.card_holder_name").value,
          number: "test_" + this.registerForm.get("step4.card_number").value,
          expiryMonth: this.fixExpiryMonth(),
          cvc: "test_" + this.registerForm.get("step4.CVV").value,
          type: "Classic",
          billingAddress: {
            HouseNumberOrName: houseNumber[0],
            street: houseNumber[1],
            stateOrProvince: String(this.accountRequest.business.postalCode),
            postalCode: String(this.accountRequest.business.postalCode),
            city: String(this.accountRequest.business.postalCode),
            country: "France",
          },
        },
      };
      this.formSubmitted = true;
      
    return new Promise(async (resolve) => {
      (await this.accountClient.createAccount(this.accountRequest)).subscribe((val) => {
        resolve(val);
        this.accountCreatedSuccess = true;
        this.accountCreatedFailure = false;
        // this.authService.login();
      }, (err) => {
        this.accountCreatedFailure = true;
        this.accountCreatedSuccess = false;
      });
    });
    }
  }

  get registerGet() {
    return this.registerForm && this.registerForm.controls;
  }

  get step1Form() {
    return this.registerForm.get("step1") as FormControl;
  }

  get firstName() {
    return this.step1Form.get("first_name")  as FormControl;
  }

  get lastName() {
    return this.step1Form.get("last_name")  as FormControl;
  }

  get email() {
    return this.step1Form.get("email")  as FormControl;
  }

  get phone() {
    return this.step1Form.get("phone")  as FormControl;
  }

  get step2Form() {
    return this.registerForm.get("step2") as FormControl;
  }

  get companyName() {
    return this.step2Form && this.step2Form.get("company_name") as FormControl;
  }

  get siren() {
    return this.step2Form && this.step2Form.get("n_siren") as FormControl;
  }

  get address() {
    return this.step2Form && this.step2Form.get("address") as FormControl;
  }

  get postalCode() {
    return this.step2Form && this.step2Form.get("postal_code") as FormControl;
  }

  get city() {
    return this.step2Form && this.step2Form.get("city") as FormControl;
  }

  get step3Form() {
    return this.registerForm.get("step3") as FormControl;
  }
  
  get storeName() {
    return this.step3Form && this.step3Form.get("store_name") as FormControl;
  }

  get storeAddress() {
    return this.step3Form && this.step3Form.get("address") as FormControl;
  }

  get storePostalCode() {
    return this.step3Form && this.step3Form.get("postal_code") as FormControl;
  }

  get step4Form() {
    return this.registerForm.get("step4") as FormControl;
  }

  get cardHolderName() {
    return this.step4Form && this.step4Form.get("card_holder_name") as FormControl;
  }

  get cardNumber() {
    return this.step4Form && this.step4Form.get("card_number") as FormControl;
  }

  get expDate() {
    return this.step4Form && this.step4Form.get("exp_date") as FormControl;
  }

  get cvv() {
    return this.step4Form && this.step4Form.get("CVV") as FormControl;
  }

  showPreview(event) {
    this.hideImageCrop = false;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.mainImage = event.base64 as string;
    this.registerForm.get("step3.image_data").patchValue({
      image_data: event.base64 as string,
    });
  }

  returnPayment() {
    this.formSubmitted = false;
    this.accountCreatedFailure = false;
  }

  // only for test cards
  fixExpiryMonth() {
    let result = "";
    let resultarray = [];
    const expiry = this.registerForm.get("step4.exp_date").value;
    resultarray = expiry.split("/");
    resultarray[0] = "test_" + resultarray[0];
    resultarray[1] = "test_" + resultarray[1];
    result = resultarray.join("/");
    console.log({ result });
    return result;
  }
}
