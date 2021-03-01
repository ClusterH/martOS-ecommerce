import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { ProductManager } from '../../services/product.manager';
import { TagAttribute } from '../../models/tag.model';
import { ArticleImage } from '../../models/articleImage';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-dialog-edit-variant',
  templateUrl: './dialog-edit-variant.component.html',
  styleUrls: ['./dialog-edit-variant.component.scss']
})
export class DialogEditVariantComponent implements OnInit {
  public tagAttributes: FormArray;
  public attributes: TagAttribute[] = [];
  variantsImagesToLoad: ArticleImage[] = [];
  public fafi: FormArray;
  inputDate: string;
  imageVariantChangedEvent: any = '';
  // croppedImage: any = '';
  hideImageVariantCrop = false;
  currentVariantImage: ArticleImage;

  minPromotionDate = new Date();


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { form: FormGroup, index: number, variantsImages: ArticleImage[], vat: number },
    private productManager: ProductManager
  ) {

    this.tagAttributes = this.data.form.get('tagAttributes') as FormArray;
  }

  ngOnInit() {
    const effe = this.tagAttributes.getRawValue();
    effe.forEach(element => {
      const attribute: TagAttribute = {
        name: element.name,
        value: element.value,
        tagId: element.tagId
      };
      this.attributes.push(attribute);
    });

    //   this.data.variantsImages.forEach(image => {
    //    this.variantsImagess.push(image.image);
    //   });

    //  console.log(this.variantsImagess);
  }


  // onVariantImageUpload(event): void {
  //   const files = event.target.files;
  //   if (files.length === 0) {
  //     return;
  //   }

  //   for (let i = 0; i < files.length; i++) {
  //     const f = files[i];
  //     if (f.type.match(/image\/*/) == null) {
  //       return;
  //     }

  //     const reader = new FileReader();
  //     reader.readAsDataURL(files[i]);


  //     reader.onload = (_event) => {
  //       var image = <ArticleImage>{
  //         id: null,
  //         image: reader.result as string,
  //         toDelete :false
  //       }
  //       this.data.variantsImages.push(image);
  //     };
  //     console.log(this.data.variantsImages);
  //   }
  // }
  onVariantImageUpload(event, i): void {
    this.hideImageVariantCrop = false;
    // console.log('main image');
    // const files = event.target.files;
    this.imageVariantChangedEvent = event;
  }

  onRemoveVariantImage(index: number): void {
    const image = this.data.variantsImages[index];
    if (image.id != null) {
      image.toDelete = true;
      this.variantsImagesToLoad.push(image);
      this.data.variantsImages.splice(index, 1);
    } else {
      this.data.variantsImages.splice(index, 1);
    }
    console.log(this.data.variantsImages);
  }
  imageVariantCropped(event: ImageCroppedEvent) {
    console.log('varain cropped');
    const file = event.base64 as string;

    this.currentVariantImage = {
      id: null,
      toDelete: false,
      image: file

    };
    // this.variantsImages[this.selectedVariantIndex].push(reader.result as string);
  }
  acceptVariantCrop() {
    if (!this.data.variantsImages) {
      this.data.variantsImages = [];
    }
    this.data.variantsImages.push(this.currentVariantImage);
    this.hideImageVariantCrop = true;
  }

  save() {
    this.variantsImagesToLoad.forEach(element => {
      this.data.variantsImages.push(element);
    });
    console.log(this.data.variantsImages);

    this.tagAttributes.controls = [];
    this.attributes.forEach(element => {
      this.tagAttributes.controls.push(new FormControl(element));
    });
    this.productManager.changeattributes(this.attributes);
  }
}
