import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/config/api.config';

export interface ProductDto {
    code?: string;
    name?: string;
    price?: string;
    image?: string;
    quantity?: string;
    type?: string;
    discount?: boolean;
    created?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private apiUrl = `${API_URL}/products`;

    constructor(private http: HttpClient) { }


    getProductsPage(page: number, limit: number = 5): Observable<HttpResponse<ProductDto[]>> {
        const url = `${this.apiUrl}?_page=${page}&_limit=${limit}&_sort=created&_order=desc`;
        return this.http.get<ProductDto[]>(url, { observe: 'response' });
    }

    getProductById(code: string): Observable<ProductDto> {
        return this.http.get<ProductDto>(`${this.apiUrl}/${code}`);
    }

    addProduct(data: ProductDto): Observable<ProductDto> {
        return this.http.post<ProductDto>(this.apiUrl, data);
    }

    updateProduct(code: string, data: Partial<ProductDto>): Observable<ProductDto> {
        return this.http.put<ProductDto>(`${this.apiUrl}/${code}`, data);
    }

    deleteProduct(code: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${code}`);
    }
}
