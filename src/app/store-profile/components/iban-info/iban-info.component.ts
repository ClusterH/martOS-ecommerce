import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { PaymentClient } from '../../clients/payment.client';
import { CardInfo } from '../../models/CardInfo';;
import { StoreProfileService } from '../../services/store-profile.service';
import { IbanInfoUpdateComponent } from '../iban-info-update/iban-info-update.component';

@Component({
  selector: 'app-iban-info',
  templateUrl: './iban-info.component.html',
  styleUrls: ['./iban-info.component.scss']
})
export class IbanInfoComponent implements OnInit {

  isEdit: boolean = false;
  isCard: boolean = false;
  calledFor: string = '';
  isTabOpen: boolean = false;
  cardInfo: CardInfo;
  currentCardInfo: Subscription;
  // cardForm: FormGroup;

  constructor(
    private paymentClient: PaymentClient,
    private storeProfileService: StoreProfileService,
    public dialog: MatDialog
  ) { }

  ngOnDestroy() {
    if (this.currentCardInfo) {
      this.currentCardInfo.unsubscribe();
    }

    this.storeProfileService.changecard(null);
  }

  async ngOnInit() {
    this.cardInfo = <CardInfo>{
      id: "",
      number: `VISA`,
      expiry: `Exp. date`
    }
    this.currentCardInfo = this.storeProfileService.currentCardInfo.subscribe(val => {
      if (!val) {
        return;
      }

      this.cardInfo = val
    });

    return new Promise(async (resolve) => {
    (await this.paymentClient.getPayment()).subscribe((cardInfo) => {
      resolve(cardInfo);
      if (cardInfo == null || cardInfo == undefined) {
        // to delete
        this.cardInfo = <CardInfo>{
          id: "",
          number: `VISA`,
          expiry: `Exp. date`
        }
        this.storeProfileService.changecard(null);
        this.isCard == false;
      } else {
        this.cardInfo = <CardInfo>{
          id: cardInfo.id,
          number: `VISA ${cardInfo.number}`,
          expiry: `Exp. date ${cardInfo.expiry}`
        }
        this.storeProfileService.changecard(this.cardInfo);

        this.isCard == true;
      }
    });
  });
  }

  addAction() {
    console.log(this.cardInfo)
    if (this.cardInfo == null || this.cardInfo.id == "") {

      this.isEdit = true;
      this.calledFor = 'add';
      console.log('this.calledFor', this.calledFor);
      this.openDialog();
    }
  }

  tabAction(value) {
    this.isTabOpen = value;
    this.isEdit = false;
  }

  deleteAction() {
    this.cardInfo = null;
  }

  openDialog() {
    const dialogRef = this.dialog.open(IbanInfoUpdateComponent, {
      data: {
        'calledFor': this.calledFor,
        'isEdit': this.isEdit
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
