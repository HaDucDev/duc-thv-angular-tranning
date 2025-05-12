import { Component, OnInit } from '@angular/core';
import { ProductDto, ProductService } from '../product-management.service';
import { ProductRefreshService, SelectedProductService } from '../product-list/product-list.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/auth.service';
import { ModalService } from 'src/app/features/shared/modal-message/modal.service';

@Component({
  selector: 'app-card-product-item',
  templateUrl: './card-product-item.component.html',
  styleUrls: ['./card-product-item.component.css']
})
export class CardProductItemComponent implements OnInit {

  productDto: ProductDto | null = null;
  isControlBtnShow: boolean = true;

  constructor(
    private selectedProductService: SelectedProductService,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private productRefreshService: ProductRefreshService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.isControlBtnShow = !!user && (user.role === 'ADMIN' || user.role === 'USER');
    });

    this.selectedProductService.selectedProduct$.subscribe(data => {
      if (!data) {
        this.router.navigate(['/product-management']);
      }
      this.productDto = data;
    });
  }

  openDetailProduct(): void {
    this.router.navigate(['/product-management/product-detail/view']);
  }

  onDeleteProduct(productDto: ProductDto, event: Event) {
    event.preventDefault();
    this.modalService.confirmDelete(`Are you sure you want to delete the product "${productDto.name}"?`, 'Confirmation')
      .subscribe((confirmed) => {
        if (confirmed) {
          if (productDto.code) {
            this.productService.deleteProduct(productDto.code).subscribe(() => {
              this.productRefreshService.triggerRefresh();
              this.router.navigate(['/product-management']);
            }, () => {
              this.modalService.showModal(
                'Notification',
                'Failed to delete product',
                [{ label: 'Close', action: 'close', class: 'btn-secondary' }],
                [],
                'error'
              );
            });
          }
        }
      });

  }
}
