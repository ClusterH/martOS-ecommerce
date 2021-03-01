import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { EDITOR_CONFIG } from './create-product-editor-config';
import { AFU_CONFIG } from './create-product-afu-config';
import * as _ from 'lodash';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import * as fromRoot from 'src/app/@store';
import * as fromProducts from 'src/app/smart-stores/products/@store/products';
import * as fromAuth from 'src/app/core/authentication/@store/auth';
import { Store as _Store, select } from '@ngrx/store';
import { takeUntil, take, skip, debounceTime } from 'rxjs/operators';
import { TagType, Tag, ProductRequest, TagAttribute, Product, Images } from '../../models';
import { DialogEditOptionsComponent, DialogEditVariantComponent, DialogAddOptionsComponent } from '../../components';
import { ProductsService, TagsService } from '../../services';
import { ProductManager } from '../../services/product.manager';
import { StoresService } from '../../../services/StoresService';
import { UploadImagesRequest } from '../../../requests/UploadImagesRequest';
import { Router } from '@angular/router';
import { DeleteImageRequest } from '../../../requests/DeleteImageRequest';
import { DeleteProductRequest } from '../../../requests/DeleteProductRequest';
import { ArticleImage } from '../../models/articleImage';
import { Store } from '../../../models/Store';
import { PresImage } from '../../models/presimage.model';
import { HeaderService } from 'src/app/_header/header.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { round } from '../../utils/math-utils';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit, OnDestroy {
  public store$: Observable<Store>;
  public categories$: Observable<Tag[]>;
  public subcategories: TagAttribute[] = [];
  public options$: Observable<Tag[]>;
  public selectedProduct$: Observable<ProductRequest>;
  public loading$: Observable<any>;
  public attributes: TagAttribute[] = [];
  public tags: Tag[] = [];
  public editorConfig: AngularEditorConfig = EDITOR_CONFIG;
  public afuConfig = AFU_CONFIG;

  public tagType = TagType;

  public isAddingVariant = false;
  public isEditProduct = false;
  public isJustSaved = false;
  public selectedVariantIndex: number;

  public productForm: FormGroup;
  public variantsForm: FormArray;
  public itemForm: FormGroup;
  public selectedVariantOptionsForm: FormArray;
  public categoryAttributesForm: FormArray;
  public selectedStore: Store;
  public genderList = ["Male", "Female", "Decline to self-identify"];
  selectedGender: string;

  public dataSource: BehaviorSubject<AbstractControl[]>;
  public displayedColumns: string[];
  public additionalColumns: any[];
  public additionalOptionsForm: FormGroup;

  public mainImage = '';
  public mainImageId = '';
  public mainImageToSave: string[] = [];
  public variantsImages: ArticleImage[][] = [];
  public images: Images;
  public arrayImage: ArticleImage[] = [];
  color = '#ffffff';
  public categories: Tag[] = [];
  public productTypes: TagAttribute[] = [];
  public itemPres: PresImage;

  imageChangedEvent: any = '';
  imageVariantChangedEvent: any = '';
  // croppedImage: any = '';
  hideImageCrop = false;
  hideImageVariantCrop = false;
  currentVariantImage: ArticleImage;

  itemFormSubmitted = false;
  variantFormSubmitted = false;

  categoryClicked = false;
  subcategoryClicked = false;

  saveButtonDisable = false;
  saveProductButtonDisable = false;

  minPromotionDate = new Date();

  private unsubscribe$: Subject<void> = new Subject();
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private store: _Store<fromRoot.State>,
    private productService: ProductsService,
    private tagService: TagsService,
    private productManager: ProductManager,
    private storesService: StoresService,
    private router: Router,
    private headerService: HeaderService,
    private toastr: ToastrService
  ) {
    this.store$ = this.store.pipe(select(fromAuth.selectSelectedStore));
    this.categories$ = this.store.pipe(select(fromProducts.selectCategories));
    this.options$ = this.store.pipe(select(fromProducts.selectOptions));
    this.selectedProduct$ = this.store.pipe(select(fromProducts.selectProduct));
    this.loading$ = this.store.pipe(select(fromProducts.selectLoading));
    this.selectedGender = "Male";
    
    this.productForm = this.fb.group({
      StoreId: [''],
      Item: this.fb.group({
        reference: [''],
        id: 0,
        name: ['', Validators.required],
        gender: ['', Validators.required],
        brand: ['', Validators.required],
        price: ['', Validators.required],
        promotion: ['', [Validators.min(0), Validators.max(100)]],
        promotionPrice: [''],
        promotionTaxedPrice: [''],
        promotionEndDate: [''],
        canDelivery: [true],
        haveDimension: [false],
        weight: [''],
        height: [''],
        long: [''],
        width: [''],
        description: ['', Validators.required],
        liveStatus: [false],
        tags: [],
        categoryAttributes: [],
        categories: [],
        articles: this.fb.array([]),
        presImage: [''],
        imageId: [],
        taxedPrice: []
        // defaultPriceTaxes:['']
      }),
    });

    this.itemFormSubmitted = false;

    this.dataSource = new BehaviorSubject([]);
    this.displayedColumns = ['name', 'brand', 'price', 'Stock', 'actions'];
    this.additionalColumns = [];

    this.itemForm = this.productForm.get('Item') as FormGroup;
    this.variantsForm = this.itemForm.get('articles') as FormArray;

    this.store$.pipe(takeUntil(this.unsubscribe$)).subscribe(_store => {
      if (!_store) {
        return;
      }

      this.productForm.patchValue({ StoreId: _store.id });
    });

    this.selectedProduct$.pipe(take(1)).subscribe(product => {
      if (!product) {
        return;
      }

      this.isEditProduct = true;
      this.fillIncomingData(product);
    });

    const effe = this.productForm.getRawValue();
    this.subcategories = effe.Item.categoryAttributes;
    this.categories = effe.Item.categories;
    this.productTypes = effe.Item.categoryAttributes;
    this.tags = effe.Item.tags;

    this.mainImage = effe.Item.presImage;
    console.log(this.mainImage);
    this.mainImageId = effe.Item.imageId;

    let index = 0;
    effe.Item.articles.forEach(article => {
      if (article.images != null) {
        const images = article.images.imageLink;

        this.arrayImage = [];
        images.forEach(image => {

          const articleImage: ArticleImage = {
            id: image.id,
            image: image.url,
            toDelete: false
          };

          this.arrayImage.push(articleImage);
          console.log(index);
        });

        this.variantsImages[index] = [];
        this.variantsImages[index] = this.arrayImage;
      } else {
        this.variantsImages[index] = [];
      }
      index = index + 1;
    });

    this.selectedProduct$.pipe(skip(1), takeUntil(this.unsubscribe$)).subscribe(product => {
      this.store$.pipe(take(1)).subscribe(s => {

        if (!product || !s) {
          return;
        }

        this.storesService.currentStore.subscribe(val => {

        });

        this.isEditProduct = true;
        this.isJustSaved = true;
      });
    });

    this.loadCategories();
    this.loadOptions();
  }

  ngOnInit() {
    // tax and promo calculation
    this.productForm.get('Item.price').valueChanges
      .pipe(
        takeUntil(this.unsubscribe$), 
        debounceTime(500)
      ).subscribe((price: number) => {
        price = +price;
        const taxedPrice: number = round(price + price * (this.selectedStore.vat / 100));
        this.productForm.get('Item.taxedPrice').setValue(taxedPrice);
        const promotion = this.productForm.get('Item.promotion').value;
        if (promotion) {
          const promotionPrice: number = price * (100 - promotion) / 100;
          this.productForm.get('Item.promotionPrice').setValue(promotionPrice, { emitEvent: false });
          const promotionTaxedPrice: number = promotionPrice + promotionPrice * (this.selectedStore.vat / 100);
          this.productForm.get('Item.promotionTaxedPrice').setValue(promotionTaxedPrice, { emitEvent: false });
        }

        if (this.variantsForm && this.variantsForm.controls) {
          this.variantsForm.controls.forEach(
            control => {
              if (!control.get('price').value) {
                control.get('price').setValue(price);
              }
            }
          )
        }
    });

    // promotion calculation for product
    this.productForm.get('Item.promotion').valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((promotion) => {
        if (promotion === '') {
          this.productForm.get('Item.promotionPrice').setValue('', { emitEvent: false });
          this.productForm.get('Item.promotionTaxedPrice').setValue('', { emitEvent: false });
          this.productForm.get('Item.promotionEndDate').setValue('', { emitEvent: false });
        } else {
          promotion = +promotion;
          const productPrice = this.productForm.get('Item.price').value;
          if (productPrice) {
            const promotionPrice: number = round(+productPrice * (100 - promotion) / 100);
            this.productForm.get('Item.promotionPrice').setValue(promotionPrice, { emitEvent: false });
            const promotionTaxedPrice: number = round(promotionPrice + promotionPrice * (this.selectedStore.vat / 100));
            this.productForm.get('Item.promotionTaxedPrice').setValue(promotionTaxedPrice, { emitEvent: false });
          }
        }
    });
    this.productForm.get('Item.promotionPrice').valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((promotionPrice) => {
        if (promotionPrice === '') {
          this.productForm.get('Item.promotion').setValue('', { emitEvent: false });
          this.productForm.get('Item.promotionTaxedPrice').setValue('', { emitEvent: false });
          this.productForm.get('Item.promotionEndDate').setValue('', { emitEvent: false });
        } else {
          promotionPrice = +promotionPrice;
          const productPrice = this.productForm.get('Item.price').value;
          if (productPrice) {
            const promotion: number = round((productPrice - promotionPrice) / productPrice * 100);
            this.productForm.get('Item.promotion').setValue(promotion, { emitEvent: false });
            const promotionTaxedPrice: number = round(promotionPrice + promotionPrice * (this.selectedStore.vat / 100));
            this.productForm.get('Item.promotionTaxedPrice').setValue(promotionTaxedPrice, { emitEvent: false });
          }
        }
    });
    this.productForm.get('Item.promotionTaxedPrice').valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((promotionTaxedPrice) => {
        if (promotionTaxedPrice === '') {
          this.productForm.get('Item.promotion').setValue('', { emitEvent: false });
          this.productForm.get('Item.promotionPrice').setValue('', { emitEvent: false });
          this.productForm.get('Item.promotionEndDate').setValue('', { emitEvent: false });
        } else {
          promotionTaxedPrice = +promotionTaxedPrice;
          const productTaxedPrice = this.productForm.get('Item.taxedPrice').value;
          if (productTaxedPrice) {
            const promotion: number = round((productTaxedPrice - promotionTaxedPrice) / productTaxedPrice * 100);
            this.productForm.get('Item.promotion').setValue(promotion, { emitEvent: false });
            const promotionPrice: number = round(promotionTaxedPrice / ((100 + this.selectedStore.vat) / 100));
            this.productForm.get('Item.promotionPrice').setValue(promotionPrice, { emitEvent: false });
          }
        }
    });

    // update name and brand for variant form
    this.productForm.get('Item.name').valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((name) => {
        if (this.variantsForm && this.variantsForm.controls) {
          this.variantsForm.controls.forEach(
            control => {
              control.get('name').setValue(name);
            }
          )
        }
    });

    this.productForm.get('Item.brand').valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((brand) => {
        if (this.variantsForm && this.variantsForm.controls) {
          this.variantsForm.controls.forEach(
            control => {
              control.get('brand').setValue(brand);
            }
          )
        }
    });

    this.headerService.comboBoxLocked.next(true);
    this.store$.pipe(takeUntil(this.unsubscribe$)).subscribe(store => {
      if (!store) {
        return;
      }

      this.selectedStore = store;
    });
  }

  loadCategories(): void {
    this.store.dispatch(new fromProducts.LoadCategories());
  }

  loadOptions(): void {
    this.store.dispatch(new fromProducts.LoadOptions());
  }

  onDuplicateProduct() {
    this.isEditProduct = false;
    this.itemForm.patchValue({
      id: 0,
      name: this.itemForm.get('name').value + ' - Copy 2',
    });
  }

  onSaveProduct() {
    this.itemFormSubmitted = true;
    if (this.itemForm.invalid) {
      return;
    }
    if (!this.variantFormsValid) {
      return;
    }
    this.saveProductButtonDisable = true;
    const effe = this.productForm.getRawValue();
    const item: Product = {
      reference: effe.Item.reference,
      id: effe.Item.id,
      name: effe.Item.name,
      brand: effe.Item.brand,
      price: effe.Item.price,
      promotion: effe.Item.promotion ? +effe.Item.promotion : null,
      promotionEndDate: effe.Item.promotionEndDate,
      canDelivery: effe.Item.canDelivery,
      haveDimension: effe.Item.haveDimension,
      weight: effe.Item.weight,
      height: effe.Item.height,
      long: effe.Item.long,
      width: effe.Item.width,
      description: effe.Item.description,
      liveStatus: effe.Item.liveStatus,
      tags: effe.Item.tags,
      categoryAttributes: this.productTypes,
      categories: this.categories,
      articles: effe.Item.articles,
      //  taxedPrice: effe.item.taxedPrice
      presImage: null
    };

    effe.Item.articles.forEach(article => {
      article.tagAttributes.forEach(tagAttribute => {
        if (tagAttribute.tagId === '') {
          tagAttribute.tagId = 0;
        }
      });
    });

    const productRequest: ProductRequest = {
      storeId: effe.StoreId,
      item,
    };

    const categoryDetailLink = '/products';
    if (this.isEditProduct) {
      this.productService.editProduct(productRequest).subscribe(val => {
        this.router.navigate([categoryDetailLink]);
        if (this.itemPres != null || this.itemPres !== undefined) {
          this.itemPres.itemId = productRequest.item.id;
          this.productManager.changecreatedImage(this.itemPres);
        }
        this.saveImages(val);
      });
    } else {
      this.productService.saveProduct(productRequest).subscribe(val => {
        this.router.navigate([categoryDetailLink]);
        if (this.itemPres != null || this.itemPres !== undefined) {
          this.itemPres.itemId = val.item.id;

          this.productManager.changecreatedImage(this.itemPres);
        }
        this.saveImages(val);
      });
    }

    this.store.dispatch(new fromProducts.SaveProduct(this.productForm.value));
    this.saveProductButtonDisable = false;

  }

  saveImages(productRequest: ProductRequest) {
    console.log('save images');
    this.store$.subscribe(val => {
      if (this.mainImageToSave.length === 1) {

        const itemImage: Images = {
          referenceStoreId: val.referenceId,
          articleGroupId: 0,
          country: val.country,
          itemId: productRequest.item.id,
          images64: this.mainImageToSave,
        };

        const request: UploadImagesRequest = {
          images: itemImage
        };

        if (this.mainImageId !== '') {
          const ids: string[] = [];
          ids.push(this.mainImageId);
          const imageToDelete: DeleteImageRequest = {
            refStoreId: val.referenceId,
            country: val.country,
            ids
          };

          this.productService.deleteImage(imageToDelete).subscribe(res => {
            console.log('---------', res);
          });
        }

        console.log(itemImage);
        // var result = await this.productService.uploadImage(request);
        this.productService.uploadImage(request).subscribe(res => {

        });
      }

      if (!this.isEditProduct) {
        this.saveVariantImages(productRequest, val);
      } else {
        this.editVariantImages(productRequest, val);
      }
    });

    console.log('redirect', productRequest);

  }

  editVariantImages(productRequest: ProductRequest, store: any) {
    console.log(this.variantsImages);
    let index = 0;


    for (const article of productRequest.item.articles) {
      // productRequest.item.articles.forEach(article => {

      const imagesToUpload = this.variantsImages[index].filter(x => x.id == null);
      const imagesToDelete = this.variantsImages[index].filter(x => x.toDelete === true);

      if (imagesToUpload != null && imagesToUpload.length !== 0) {
        const variantImages: Images = {
          referenceStoreId: store.referenceId,
          articleGroupId: article.id,
          country: store.country,
          itemId: productRequest.item.id,
          images64: imagesToUpload.map(x => x.image),
        };

        console.log(imagesToUpload);

        const request: UploadImagesRequest = {
          images: variantImages
        };
        // this.productService.uploadImage(request);
        this.productService.uploadImage(request).subscribe(val => {
          console.log('---------', val);
        });
      }

      if (imagesToUpload != null && imagesToDelete.length !== 0) {
        const variantImagesToDelete: DeleteImageRequest = {
          refStoreId: store.referenceId,
          country: store.country,
          ids: imagesToDelete.map(x => x.id)
        };

        this.productService.deleteImage(variantImagesToDelete).subscribe(val => {
          console.log('---------', val);
        });
      }
      index = index + 1;
    }


    //
  }

  saveVariantImages(productRequest: ProductRequest, store: any) {

    let index = 0;
    for (const article of productRequest.item.articles) {
      if (this.variantsImages[index] !== []) {
        const variantImages: Images = {
          referenceStoreId: store.referenceId,
          articleGroupId: article.id,
          country: store.country,
          itemId: productRequest.item.id,
          images64: this.variantsImages[index] ? this.variantsImages[index].map(x => x.image) : [],
        };

        const request: UploadImagesRequest = {
          images: variantImages
        };

        // this.productService.uploadImageAsync(request);
        this.productService.uploadImage(request).subscribe(val => {
          console.log('---------', val);
        });
      }
      index = index + 1;
    }

  }

  onDeleteProduct() {
    const effe = this.productForm.getRawValue();
    const deleteProduct: DeleteProductRequest = {
      id: effe.Item.id,
      storeId: this.selectedStore.id
    };
    console.log(deleteProduct);

    this.productService.deleteProduct(deleteProduct).subscribe(val => {
      if (val.success === true) {
        this.deleteImages();
      }
    });

  }

  deleteImages() {
    const ids: string[] = [];
    if (this.mainImageId !== '') {
      ids.push(this.mainImageId);
    }

    this.variantsImages.forEach(images => {
      images.forEach(image => {
        if (image.id !== '') {
          ids.push(image.id);
        }
      });
    });

    const deleteImagesRequest: DeleteImageRequest = {
      refStoreId: this.selectedStore.referenceId,
      country: this.selectedStore.country,
      ids
    };

    this.productService.deleteImage(deleteImagesRequest).subscribe(val => {
      console.log('---------', val);
    });
    const categoryDetailLink = '/products';
    this.router.navigate([categoryDetailLink]);
  }

  get isVariantOptionInvalid() {
    return this.selectedVariantOptionsForm && 
      (!this.selectedVariantOptionsForm.controls || this.selectedVariantOptionsForm.controls.length < 1 
        || this.selectedVariantOptionsForm.controls.some(control => control.invalid));
  }

  onSaveVariant(): void {
    this.saveButtonDisable = true;
    this.variantFormSubmitted = true;
    if (this.variantsForm.controls[this.selectedVariantIndex].invalid) {
      return;
    }
    if (this.isVariantOptionInvalid) {
      return;
    }
    if (this.isEditProduct) {
      this.variantsForm.controls[this.selectedVariantIndex].get('tagAttributes').updateValueAndValidity();
      this.variantsForm.value[this.selectedVariantIndex].tagAttributes.map((tagAttr, i) => {

        if (!this.additionalColumns[tagAttr.name]) {
          this.additionalColumns[tagAttr.name] = [];
        }
        this.additionalColumns[tagAttr.name][this.selectedVariantIndex] = tagAttr.value;

        const productTags = this.itemForm.get('tags') as FormArray;

        if (productTags && productTags.value && !productTags.value.find(tag => tag.name === tagAttr.name)) {
          productTags.setValue(
            [
              ...productTags.value,
              {
                id: tagAttr.tagId,
                name: tagAttr.name,
                tagType: TagType.Option
              }
            ]
          );
        }

        if (!this.displayedColumns.includes(tagAttr.name)) {
          this.displayedColumns.splice(3, 0, tagAttr.name);
        }
      });

      this.isAddingVariant = false;
      this.updateVariantsTableView();
      this.saveButtonDisable = false;
    } else {
      this.variantsForm.controls[this.selectedVariantIndex].get('tagAttributes').updateValueAndValidity();
      this.variantsForm.value[this.selectedVariantIndex].tagAttributes.map((tagAttr, i) => {
        if (!this.additionalColumns[tagAttr.name]) {
          this.additionalColumns[tagAttr.name] = [];
        }
        this.additionalColumns[tagAttr.name][this.selectedVariantIndex] = tagAttr.value;

        const productTags = this.itemForm.get('categories') as FormArray;

        if (productTags && productTags.value && !productTags.value.find(tag => tag.name === tagAttr.name)) {
          productTags.setValue(
            [
              ...productTags.value,
              {
                id: tagAttr.tagId,
                name: tagAttr.name,
                tagType: TagType.Option
              }
            ]
          );
        }

        if (!this.displayedColumns.includes(tagAttr.name)) {
          this.displayedColumns.splice(3, 0, tagAttr.name);
        }
      });

      const toastContent = '<h5><div class="custom-toast-check-icon"><span></span></div>Variant is added successfully!</h5>';
      this.toastr.success(toastContent, '', {
        positionClass: 'custom-toast',
        enableHtml: true
      });
      this.isAddingVariant = false;
      this.updateVariantsTableView();
      this.saveButtonDisable = false;
    }
  }

  onDiscardVariant(): void {
    this.isAddingVariant = false;
    this.variantsForm.removeAt(this.selectedVariantIndex);
  }

  addVariant(): void {

    this.imageVariantChangedEvent = null;

    const newVariantForm = this.getVariantForm();

    newVariantForm.patchValue({
      name: this.itemForm.value.name,
      brand: this.itemForm.value.brand,
      liveStatus: this.itemForm.value.liveStatus,
      price: this.itemForm.value.price,
      promotion: this.itemForm.value.promotion,
      promotionEndDate: this.itemForm.value.promotionEndDate,
    });

    const tagAttributes = newVariantForm.get('tagAttributes') as FormArray;

    Object.keys(this.additionalColumns).map(column => {
      this.options$.pipe(take(1)).subscribe(opts => {
        const option = opts.find(opt => opt.name === column);
        console.log(option);
        const optionForm = this.getOptionsForm();

        optionForm.patchValue({
          name: option.name,
          tagId: option.id,
        });
        tagAttributes.controls.push(optionForm);
      });
    });

    tagAttributes.updateValueAndValidity();

    this.variantsForm.push(newVariantForm);
    this.selectedVariantIndex = this.variantsForm.length - 1;
    this.selectedVariantOptionsForm = this.variantsForm.controls[this.selectedVariantIndex].get('tagAttributes') as FormArray;
    this.isAddingVariant = true;
    this.variantFormSubmitted = false;
  }

  addOption(): void {
    (this.variantsForm.controls[this.selectedVariantIndex].get('tagAttributes') as FormArray).push(this.getOptionsForm());
  }

  getVariantForm(): FormGroup {
    const newVariantForm = this.fb.group({
      id: 0,
      liveStatus: [],
      reference: [''],
      name: [''],
      brand: [''],
      isSold: [false],
      price: ['', Validators.required],
      promotion: ['', [Validators.min(0), Validators.max(100)]],
      promotionPrice: [''],
      promotionTaxedPrice: [''],
      promotionEndDate: [''],
      stock: 0,
      tagAttributes: this.fb.array([]),
      images: []
    });
    // promotion calculation for variant
    newVariantForm.get('price').valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((price: number) => {
        price = +price;
        const promotion = newVariantForm.get('promotion').value;
        if (promotion) {
          const promotionPrice: number = round(price * (100 - promotion) / 100);
          newVariantForm.get('promotionPrice').setValue(promotionPrice, { emitEvent: false });
          const promotionTaxedPrice: number = round(promotionPrice + promotionPrice * (this.selectedStore.vat / 100));
          newVariantForm.get('promotionTaxedPrice').setValue(promotionTaxedPrice, { emitEvent: false });
        }
    });
    newVariantForm.get('promotion').valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((promotion) => {
        if (promotion === '') {
          newVariantForm.get('promotionPrice').setValue('', { emitEvent: false });
          newVariantForm.get('promotionTaxedPrice').setValue('', { emitEvent: false });
          newVariantForm.get('promotionEndDate').setValue('', { emitEvent: false });
        } else {
          promotion = +promotion;
          const variantPrice = newVariantForm.get('price').value;
          if (variantPrice) {
            const promotionPrice: number = round(variantPrice * (100 - promotion) / 100);
            newVariantForm.get('promotionPrice').setValue(promotionPrice, { emitEvent: false });
            const promotionTaxedPrice: number = round(promotionPrice + promotionPrice * (this.selectedStore.vat / 100));
            newVariantForm.get('promotionTaxedPrice').setValue(promotionTaxedPrice, { emitEvent: false });
          }
        }
    });
    newVariantForm.get('promotionPrice').valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((promotionPrice) => {
        if (promotionPrice === '') {
          newVariantForm.get('promotion').setValue('', { emitEvent: false });
          newVariantForm.get('promotionTaxedPrice').setValue('', { emitEvent: false });
          newVariantForm.get('promotionEndDate').setValue('', { emitEvent: false });
        } else {
          promotionPrice = +promotionPrice;
          const variantPrice = newVariantForm.get('price').value;
          if (variantPrice) {
            const promotion: number = round((variantPrice - promotionPrice) / variantPrice * 100);
            newVariantForm.get('promotion').setValue(promotion, { emitEvent: false });
            const promotionTaxedPrice: number = round(promotionPrice + promotionPrice * (this.selectedStore.vat / 100));
            newVariantForm.get('promotionTaxedPrice').setValue(promotionTaxedPrice, { emitEvent: false });
          }
        }
    });
    newVariantForm.get('promotionTaxedPrice').valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((promotionTaxedPrice) => {
        if (promotionTaxedPrice === '') {
          newVariantForm.get('promotion').setValue('', { emitEvent: false });
          newVariantForm.get('promotionPrice').setValue('', { emitEvent: false });
          newVariantForm.get('promotionEndDate').setValue('', { emitEvent: false });
        } else {
          promotionTaxedPrice = +promotionTaxedPrice;
          const variantPrice = newVariantForm.get('price').value;
          const variantTaxedPrice = round(variantPrice + variantPrice * (this.selectedStore.vat / 100));
          if (variantPrice) {
            const promotion: number = round((variantTaxedPrice - promotionTaxedPrice) / variantTaxedPrice * 100);
            newVariantForm.get('promotion').setValue(promotion, { emitEvent: false });
            const promotionPrice: number = round(promotionTaxedPrice / ((100 + this.selectedStore.vat) / 100));
            newVariantForm.get('promotionPrice').setValue(promotionPrice, { emitEvent: false });
          }
        }
    });
    return newVariantForm;
  }

  getOptionsForm(): FormGroup {
    return this.fb.group({
      tagId: [''],
      name: ['', Validators.required],
      value: ['']
    });
  }

  onChangeOption(option: Tag, index: number): void {
    console.log("option===>", option);
    if(option.name === 'Edit options' || option.name === 'Edit option' || option.name === 'edit options' || option.name === 'edit option'){
      this.addOptions();
    }
    else{
      (this.selectedVariantOptionsForm.controls[index] as FormGroup).patchValue({
        tagId: option.id,
        name: option.name,
      });
    }
  }

  onChangeCategory(categories: Tag[]): void {
    this.categories = categories;
    this.categoryAttributesForm = this.fb.array([]);
    this.subcategories = [];
    categories.map(category => {
      const categoryForm = this.getOptionsForm();
      categoryForm.patchValue({
        tagId: category.id,
        name: category.name,
      });
      this.categoryAttributesForm.push(categoryForm);

      this.tagService.getAttributesByTagId(category.id).subscribe(res => {
        this.subcategories = [...this.subcategories, ...res];
      });
    });
  }

  onChangeSubcategory(subcategories: TagAttribute[]): void {
    this.productTypes = subcategories;
    this.productForm.value.categoryAttributes = subcategories;
  }

  onChangeGender(gender: string) {
    this.selectedGender = gender;
  }

  addOptions(): void {
    const dialogRef = this.dialog.open(DialogAddOptionsComponent, { minWidth: '700px', data: this.additionalColumns });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      if(res == "success") {
        this.loadOptions();
      }
    })
  }

  editOptions(): void {
    const dialogRef = this.dialog.open(DialogEditOptionsComponent, { minWidth: '700px', data: this.additionalColumns });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      if (!data) {
        return;
      }

      data.map(option => {
        this.variantsForm.controls.map((variant: FormGroup, i) => {
          const tagAttributes = variant.get('tagAttributes') as FormArray;
          if (!(tagAttributes.value as Array<any>).find((opt) => opt.name === option)) {
            const newControl = this.getOptionsForm();
            newControl.patchValue({ name: option });
            tagAttributes.push(newControl);
          }

          if (!(tagAttributes.value as Array<any>).find((opt) => opt.name === option)) {
            const newControl = this.getOptionsForm();
            newControl.patchValue({ name: option });
            tagAttributes.push(newControl);
          }
          console.log(this.additionalColumns);
          console.log(option);
          console.log(tagAttributes);
          if (!this.additionalColumns[option]) {
            this.additionalColumns[option] = [];
          }

          if (!this.additionalColumns[option][i]) {
            this.additionalColumns[option][i] = '';
          }
        });

        if (!this.displayedColumns.includes(option)) {
          this.displayedColumns.splice(3, 0, option);
        }
      });

      console.log(this.productManager.optionsToDelete);
      this.productManager.optionsToDelete.forEach(option => {
          const opToDel = this.displayedColumns.findIndex(x => x === option.name);
          delete this.displayedColumns[opToDel];
          this.displayedColumns = this.displayedColumns.filter(item => item);
          delete this.additionalColumns[option.name];

          this.variantsForm.controls.map((variant: FormGroup, i) => {
            const tagAttributes = variant.get('tagAttributes') as FormArray;

            tagAttributes.removeAt(tagAttributes.value.findIndex(opt => opt.name === option.name));
          });
        });

      this.productManager.optionsToDelete = [];
      console.log(this.productManager.optionsToAdd);
      this.productManager.optionsToAdd.forEach(option => {
        this.displayedColumns = this.displayedColumns.filter(item => item);
        const newAttribute = {
          tagId : option.id,
          name : option.name,
          value : ''
        };

        this.variantsForm.controls.map((variant: FormGroup, i) => {
          const tagAttrForm = variant.get('tagAttributes') as FormArray;
          const optionsForm = this.getOptionsForm();
          optionsForm.patchValue({ ...newAttribute });
        });

        this.productManager.optionsToAdd = [];
      });
      this.updateVariantsTableView();
    });
  }

  editVariant(option: FormGroup, index: number): void {
    const dialogRef = this.dialog.open(DialogEditVariantComponent, {
      data:
        { form: option, index, variantsImages: this.variantsImages[index] || [], vat: this.selectedStore.vat }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      if (!data) {
        return;
      }
      this.productManager.currentattributes.subscribe(val => {
        this.attributes = val;

        data.form.value.tagAttributes.controls = [];
        data.form.value.tagAttributes = val;
      });

      data.form.value.tagAttributes.map(tagAttr => {
        this.additionalColumns[tagAttr.name][data.index] = tagAttr.value;
      });

      this.variantsImages[data.index] = data.variantsImages;
      this.updateVariantsTableView();
    });
  }

  deleteVariant(option: FormGroup, index: number): void {

    this.isEditProduct = true;
    this.variantsForm.removeAt(index);
    const currentTagsToDelete = option.get('tagAttributes') as FormArray;
    const tagValues = currentTagsToDelete.getRawValue();

    tagValues.forEach(tag => {
      delete this.additionalColumns[tag.name][index];
      this.additionalColumns[tag.name].splice(index, 1);
      console.log(this.additionalColumns);
    });

    this.variantsForm.updateValueAndValidity();
    console.log('data source', this.dataSource);
    this.updateVariantsTableView();
    console.log('data source', this.dataSource);
  }

  updateVariantsTableView(): void {
    this.dataSource.next(this.variantsForm.controls);
  }

  onMainImageUpload(event): void {
    this.hideImageCrop = false;
    console.log('main image');
    // const files = event.target.files;
    this.imageChangedEvent = event;
    // if (files.length === 0) {
    //   return;
    // }

    // const mimeType = files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }

    // const reader = new FileReader();
    // console.log(files[0]);
    // reader.readAsDataURL(files[0]);
    // reader.onload = (_event) => {

    //   this.mainImage = reader.result as string;
    //   this.mainImageToSave.push(reader.result as string);
    //   this.itemPres = <PresImage>{
    //     itemId: 0,
    //     url: reader.result as string
    //   }
    // };
  }

  onVariantImageUpload(event, i): void {
    this.hideImageVariantCrop = false;
    // console.log('main image');
    // const files = event.target.files;
    this.imageVariantChangedEvent = event;
  }

  onRemoveVariantImage(index: number): void {
    this.variantsImages[this.selectedVariantIndex].splice(index, 1);
  }

  fillIncomingData(data: ProductRequest): void {
    this.itemForm.patchValue({ ...data.item });

    data.item.articles.map((variant, i) => {
      const variantForm = this.getVariantForm();
      variantForm.patchValue({ ...variant });

      console.log(this.variantsImages);
      const tagAttrForm = variantForm.get('tagAttributes') as FormArray;
      variant.tagAttributes.map(option => {
        const optionsForm = this.getOptionsForm();
        optionsForm.patchValue({ ...option });
        tagAttrForm.controls.push(optionsForm);

        if (!this.additionalColumns[option.name]) {
          this.additionalColumns[option.name] = [];
        }

        this.additionalColumns[option.name][i] = option.value;

        if (!this.displayedColumns.includes(option.name)) {
          this.displayedColumns.splice(3, 0, option.name);
        }
      });

      tagAttrForm.updateValueAndValidity();

      this.variantsForm.controls.push(variantForm);
      this.variantsForm.updateValueAndValidity();
    });

    this.itemForm.updateValueAndValidity();
    this.updateVariantsTableView();

    // this.variantsForm.patchValue([...data.item.articles]);
    // this.productForm.patchValue({ item: data.item });
  }



  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.mainImage = event.base64 as string;
    this.mainImageToSave = [];
    this.mainImageToSave.push(event.base64 as string);
    this.itemPres = {
      itemId: 0,
      url: event.base64 as string
    };

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
    if (!this.variantsImages[this.selectedVariantIndex]) {
      this.variantsImages[this.selectedVariantIndex] = [];
    }
    this.variantsImages[this.selectedVariantIndex].push(this.currentVariantImage);
    this.hideImageVariantCrop = true;
  }

  switchHaveDimension(haveDimension: boolean) {
    this.itemForm.get('haveDimension').setValue(haveDimension);
    if (!haveDimension) {
      this.itemForm.patchValue({
        height: null,
        width: null,
        long: null,
        weight: null,
      })
    }
  }

  categoryClick() {
    this.categoryClicked = true;
  }

  subcategoryClick() {
    this.subcategoryClicked = true;
  }

  switchCanDelivery(canDelivery: boolean) {
    this.itemForm.get('canDelivery').setValue(canDelivery);
  }

  get name() {
    return this.itemForm && this.itemForm.get('name');
  }

  get description() {
    return this.itemForm && this.itemForm.get('description');
  }

  get price() {
    return this.itemForm && this.itemForm.get('price');
  }

  get variantPrice() {
    return this.selectedVariantForm && this.selectedVariantForm.get('price');
  }

  get brand() {
    return this.itemForm && this.itemForm.get('brand');
  }

  get selectedVariantForm() {
    return this.variantsForm && this.variantsForm.controls[this.selectedVariantIndex];
  }

  get variantFormsValid() {
    return this.variantsForm && this.variantsForm.length > 0 && this.variantsForm.controls.every(control => control.valid);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.headerService.comboBoxLocked.next(false);
    this.store.dispatch(new fromProducts.ResetSelectedProduct());
  }
}
