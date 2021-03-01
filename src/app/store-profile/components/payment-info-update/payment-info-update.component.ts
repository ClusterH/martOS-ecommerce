import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { StoreProfileService } from '../../services/store-profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreatePaymentRequest } from '../../models/CreatePaymentRequest';
import { Bank } from '../../models/Bank';
import { CardDetails } from '../../../smart-stores/models/CardDetails';
import { Card } from '../../../smart-stores/models/Card';
import { PaymentClient } from '../../clients/payment.client';
import { CardInfo } from '../../models/CardInfo';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-info-update',
  templateUrl: './payment-info-update.component.html',
  styleUrls: ['./payment-info-update.component.scss']
})
export class PaymentInfoUpdateComponent implements OnInit {

  // @Input() calledFor: string;
  // @Output() closeModalAction: string;
  paymentForm: FormGroup;
  paymentFormArray: any;
  calledFor: string;
  isEdit: boolean;
  currentCardInfo: Subscription;


  constructor(
    private paymentClient: PaymentClient,
    private storeProfileService: StoreProfileService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PaymentInfoUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log('data', this.data);
    this.calledFor = this.data.calledFor;
    this.isEdit = this.data.isEdit;

    this.paymentForm = this.formBuilder.group({
      bank: this.formBuilder.group({
        holderName: [''],
        bic: [''],
        iban: [''],
        bankName: [''],
        ownerName: ['']
      }),
      cardDetails: this.formBuilder.group({
        card: this.formBuilder.group({
          cardName:[''],
          holderName: ['', [Validators.required, Validators.minLength(2)]],
          cvc: ['', [Validators.required, Validators.minLength(2)]],
          expiryMonth: ['', [Validators.required, Validators.minLength(2)]],
          number: ['', [Validators.required, Validators.minLength(2)]],
          type: ['classic']
        })
      }),
    });
    console.log('paymentForm', this.paymentForm);
  }

  // closeModal(){
  //     this.storeProfileService.closeModalService.next(false);
  //     this.onNoClick();
  //     // console.log('click');
  // }

  ngOnDestroy() {
    if(this.currentCardInfo){
      this.currentCardInfo.unsubscribe();
    }
    
     this.storeProfileService.changecard(null);
  }

  async onSubmit() {
    this.currentCardInfo = this.storeProfileService.currentCardInfo.subscribe(val => {
      if (!val) {
        return;
      }
      if (val != null && val !== undefined) {
        this.onNoClick();
      }
    });

    const request = this.paymentForm.value;

    return new Promise(async (resolve) => {
    (await this.paymentClient.create(request)).subscribe(async (val) => {
      resolve(val);

      (await this.paymentClient.getPayment()).subscribe((cardInfo: CardInfo) => {
        resolve(cardInfo);
        if (cardInfo != null || cardInfo !== undefined) {
          cardInfo = {
            id: cardInfo.id,
            number: `VISA ${cardInfo.number}`,
            expiry: `Exp. date ${cardInfo.expiry}`
          };
          this.storeProfileService.changecard(cardInfo);
        } else {
          cardInfo = {
            id: '',
            number: `VISA`,
            expiry: `Exp. date`
          };

          this.storeProfileService.changecard(null);
        }
      });
    });

    this.onNoClick();
    console.log('this.paymentForm', this.paymentForm.value);
  });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
