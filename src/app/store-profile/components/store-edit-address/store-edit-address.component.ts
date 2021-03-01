import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-store-edit-address',
  templateUrl: './store-edit-address.component.html',
  styleUrls: ['./store-edit-address.component.scss']
})
export class StoreEditAddressComponent implements OnInit {
  editAddressFrom: FormGroup;
  constructor(public matDialogRef: MatDialogRef<StoreEditAddressComponent>) { }

  ngOnInit() {
    this.editAddressFrom = new FormGroup({
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    });
  }

  closeDialogue() {
    this.editAddressFrom.markAllAsTouched();
    if (this.editAddressFrom.valid) {
      this.matDialogRef.close(this.editAddressFrom.value);
    }
  }

}
