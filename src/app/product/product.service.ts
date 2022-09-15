import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { Product } from '../shared/product';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = "https://fakestoreapi.com/products";

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  public getAllCategories(): Observable<string[]> {
    return this.http.get<any>(`${this.baseUrl}/categories`);
  }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  public sortProducts(sortOrder: string): Observable<Product[]> {
    return this.http.get<any>(`${this.baseUrl}?sort=${sortOrder}`);
  }

  public searchProducts() {
    return this.sharedService.searchTextUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged());
  }
}
