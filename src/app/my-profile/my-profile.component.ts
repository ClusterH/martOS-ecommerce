import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../smart-stores/services/User.service';
import { UserInfo, ImgRequest } from '../smart-stores/products/models/user.model';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  editMode = false;
  hideImageCrop = true;
  imageChangedEvent: any = '';
  userProfile = new FormGroup({
    id: new FormControl(''),
    imageUrl: new FormControl('/assets/images/add-image.svg'),
    name: new FormControl('', Validators.required),
    familyName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    nPassword: new FormControl(''),
    cPassword: new FormControl('')
  }, { validators: this.passwordMatchValidator });
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe((next: UserInfo) => {
      this.userProfile.patchValue(next);
    });
  }
  Save() {
    this.userProfile.markAllAsTouched();
    if (this.userProfile.valid) {
      const submittedValue = this.userProfile.value;
      if (this.userProfile.get('nPassword').value === '') {
        delete submittedValue.nPassword;
        delete submittedValue.cPassword;
      }
      console.log(this.userProfile.value);
    }
  }
  passwordMatchValidator(g: FormGroup) {
    return g.get('nPassword').value === g.get('cPassword').value ? null : { match: true };
  }
  onMainImageUpload(event): void {
    this.hideImageCrop = false;
    console.log('main image');
    // const files = event.target.files;
    this.imageChangedEvent = event;

  }
  imageCropped(event: ImageCroppedEvent) {
    this.userProfile.get('imageUrl').setValue(event.base64 as string);
  }
  saveImage() {
    let img: string = this.userProfile.get('imageUrl').value;
    img = img.split(',')[1];
    const request: ImgRequest = {
      userId: this.userProfile.get('id').value,
      country: 'France',
      base64: img
    };
    console.log({ request });
    this.userService.updateUserImage(request).subscribe(next => {
      console.log({ next });
      this.hideImageCrop = true;
    });
  }
}
