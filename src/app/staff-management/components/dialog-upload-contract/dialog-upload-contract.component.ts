import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-upload-contract',
  templateUrl: './dialog-upload-contract.component.html',
  styleUrls: ['./dialog-upload-contract.component.scss']
})
export class DialogUploadContractComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onContractUpload(event) {
    const files = event.target.files;
    if (files.length === 0) {
      return;
    }
  }

}
