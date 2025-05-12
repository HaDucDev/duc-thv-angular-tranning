import { Injectable } from "@angular/core";
import { ProductDto } from "../product-management.service";
import { BehaviorSubject, Observable, Subject } from "rxjs";


@Injectable({ providedIn: 'root' })
export class SelectedProductService {

  private selectedProductSubject = new BehaviorSubject<ProductDto | null>(null);
  selectedProduct$: Observable<ProductDto | null> = this.selectedProductSubject.asObservable();

  private selectedCodeSubject = new BehaviorSubject<string | null>(null);
  selectedCode$ = this.selectedCodeSubject.asObservable();

  setProductDto(product: ProductDto): void {
    this.selectedProductSubject.next(product);
  }

  setSelectedProductCode(productCode: string): void {
    this.selectedCodeSubject.next(productCode);
  }

  getProductDto(): ProductDto | null {
    return this.selectedProductSubject.getValue();
  }

  getProductCode(): string | null {
    return this.selectedCodeSubject.getValue();
  }

  clearProductDto() {
    this.selectedProductSubject.next(null);
    this.selectedCodeSubject.next(null);
  }
}

@Injectable({ providedIn: 'root' })
export class ProductRefreshService {
  private refreshNeeded = new Subject<void>();

  get refreshNeeded$() {
    return this.refreshNeeded.asObservable();
  }

  triggerRefresh() {
    this.refreshNeeded.next();
  }
}