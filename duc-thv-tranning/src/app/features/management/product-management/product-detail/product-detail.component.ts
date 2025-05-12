import { Component, OnInit } from '@angular/core';
import { ProductDto, ProductService } from '../product-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { priceValidator } from './product-price.validator';
import { ProductRefreshService, SelectedProductService } from '../product-list/product-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/auth.service';
import { FIELD_LABELS_PRODUCT, PRODUCT_VALIDATION_MESSAGES } from './product-detail.constants-messages';
import { ModalService } from 'src/app/features/shared/modal-message/modal.service';
import { ErrorHelperService } from 'src/app/features/shared/modal-message/error-helper.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productData: ProductDto = {
    code: '',
    name: '',
    price: '',
    image: '',
    quantity: '',
    type: 'Single Product',
    discount: false,
  };

  // Distinguish between add and detail modes
  mode: 'add' | 'view' = 'view';
  isDetailMode: boolean = false;

  productForm: FormGroup;
  isEditMode: boolean = false;
  isControlBtnShow: boolean = true;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private selectedProductService: SelectedProductService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private productRefreshService: ProductRefreshService,
    private modalService: ModalService,
    private errorHelperService: ErrorHelperService,
  ) { }

  ngOnInit(): void {

    this.authService.currentUser$.subscribe(user => {
      this.isControlBtnShow = !!user && (user.role === 'ADMIN' || user.role === 'USER');
      this.mode = this.route.snapshot.data['mode'] || 'view';
    });

    this.productForm = this.fb.group({
      code: ['', [
        Validators.required,
        Validators.maxLength(10)
      ]],
      name: ['', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9\s\-']+$/)
      ]],
      price: ['', [priceValidator]],
      quantity: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(1000),
        Validators.pattern(/^[0-9]+$/)
      ]],
      type: ['Single Product'],
      discount: [{ value: false, disabled: false }],
      image: ['', [
        Validators.required,
        Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg))$/i)
      ]],
    });

    this.loadProducDetail();

    if (!this.isDetailMode && this.mode === 'view') {
      this.router.navigate(['/product-management']);
      return;
    }
  }

  loadProducDetail() {
    this.selectedProductService.selectedProduct$.subscribe(product => {
      if (product && this.mode === 'view') {
        this.productData = { ...product };
        this.isDetailMode = true;
        this.productForm.disable();
      }
    });
  }

  onEdit(): void {
    this.isEditMode = true;
    this.productForm.enable();
  }

  onCancelEdit(): void {
    this.isEditMode = false;
    this.loadProducDetail();
  }

  onPriceChange(value: string) {
    const num = parseFloat(value.replace(/[^\d.-]/g, ''));
    if (!isNaN(num)) {
      this.productData.price = num.toFixed(2).toString();
    }
  }

  onSave(): void {
    if (this.productForm.invalid) {
      const errors = this.getValidationErrors();
      this.modalService.showModal(
        'Validation error',
        'Please check the following fields:',
        [{ label: 'Close', action: 'close', class: 'btn-secondary' }],
        errors,
        'error'
      );
      return;
    }

    if (this.mode === 'view') {
      // update product
      this.productService.updateProduct(this.productData.code, this.productData).subscribe((updatedProduct) => {
        this.selectedProductService.setProductDto(updatedProduct);
        this.productRefreshService.triggerRefresh();
        this.router.navigate(['/product-management/product-card']);
      });
    } else {
      this.productService.getProductById(this.productData.code).subscribe(product => {
        if (product) {
          this.modalService.showModal(
            'Validation error',
            'Please check the following fields:',
            [{ label: 'Close', action: 'close', class: 'btn-secondary' }],
            [PRODUCT_VALIDATION_MESSAGES.productExists,],
            'error'
          );
          return;
        }
      });
      /////
      // create product
      this.productService.addProduct(this.productData).subscribe(() => {
        this.productRefreshService.triggerRefresh();
        this.router.navigate(['/product-management']);
      });
    }

  }

  private getValidationErrors(): string[] {
    const errors: string[] = [];
    const controls = this.productForm.controls;
    for (const name in controls) {
      const control = controls[name];
      if (control && control.errors) {
        const field = FIELD_LABELS_PRODUCT[name] || name;
        for (const key in control.errors) {
          const extra = control.errors[key];
          errors.push(this.errorHelperService.getMessage(
            PRODUCT_VALIDATION_MESSAGES, key, field, extra, name
          ));
        }
      }
    }
    return errors;
  }

  onClose(): void {
    this.router.navigate(['/product-management/product-card']);
  }

  onAddClose(): void {
    this.router.navigate(['/product-management']);
  }

  blockNonDigits(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (
      !/[0-9]/.test(event.key) &&
      !allowedKeys.includes(event.key)
    ) {
      event.preventDefault();
    }
  }

  blockNonDigitsPrice(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
    const input = event.target as HTMLInputElement;

    if (allowedKeys.includes(event.key)) {
      return;
    }

    // Only one dot (.) is allowed.
    if (event.key === '.') {
      if (input.value.includes('.')) {
        event.preventDefault();
      }
      return;
    }

    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

}
