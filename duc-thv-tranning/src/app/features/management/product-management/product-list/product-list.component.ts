import { Component, OnInit, } from '@angular/core';
import { ProductDto, ProductService } from '../product-management.service';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRefreshService, SelectedProductService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: ProductDto[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalProducts: number = 0;
  isControlBtnShow: boolean = true;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private selectedProductService: SelectedProductService,
    private productRefreshService: ProductRefreshService,
  ) { }

  ngOnInit(): void {

    this.loadProducts();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (currentUser.role === 'CLIENT') {
      this.isControlBtnShow = false;
    }

    this.productRefreshService.refreshNeeded$.subscribe(() => {
      this.loadProducts();
    });

    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navEntries.length > 0 && navEntries[0].type === 'reload') {
      this.router.navigate(['/product-management']);
    }
  }

  loadProducts() {
    this.productService.getProductsPage(this.currentPage, this.pageSize).subscribe((res: HttpResponse<ProductDto[]>) => {
      this.products = res.body || [];
      this.totalProducts = +res.headers.get('X-Total-Count')!;
    });
  }

  goToPage(page: number) {
    this.selectedProductService.clearProductDto();
    this.currentPage = page;
    this.loadProducts();
    this.router.navigate(['/product-management']);
  }

  getTotalPages(): number[] {
    const totalPages = Math.ceil(this.totalProducts / this.pageSize);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  viewCardProduct(productDto: ProductDto) {
    if (this.selectedProductService.getProductCode() === productDto.code) {
      this.selectedProductService.clearProductDto();
      this.router.navigate(['/product-management']);
      return;
    }
    this.selectedProductService.setProductDto(productDto);
    this.selectedProductService.setSelectedProductCode(productDto.code);
    this.router.navigate(['product-card'], { relativeTo: this.route });
  }

  isProductSelected(product: ProductDto): boolean {
    return this.selectedProductService.getProductCode() === product.code;
  }

  openAddProduct(): void {
    this.selectedProductService.clearProductDto();
    this.router.navigate(['/product-management/product-detail/add']);
  }

}
