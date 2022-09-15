import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  categories: string[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedRecords: Product[] = [];
  pageSize: number = 5;
  value: number = 123;
  _currentValues:number[] = [];

  constructor(private productService: ProductService) {

    this.productService.searchProducts().subscribe((value: string) => {
      this.filterProducts(value);
    });

  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
  }

  getAllCategories() {
    this.productService.getAllCategories().subscribe(resp => {
      this.categories = resp;
    })
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(resp => {
      this.products = resp;
      this.filteredProducts = [...resp];
      this.showPaginatedRecords();
    })
  }

  filterProducts(searchValue: string) {
    this.filteredProducts = this.filteredProducts.filter((product: Product) => {
      return product.title.toLowerCase().includes(searchValue?.toLowerCase());
    });
    this.showPaginatedRecords();
  }

  filterByCategory(categories: string[]) {
    if (categories?.length > 0) {
      this.filteredProducts = this.products.filter((product: Product) => {
        return categories.includes(product.category);
      });
    } else {
      this.filteredProducts = [...this.products];
    }
    this.showPaginatedRecords();
  }

  showPaginatedRecords(activePage: number = 1) {
    this.paginatedRecords = this.filteredProducts.slice((activePage - 1) * this.pageSize, activePage * this.pageSize);
  }

  paginateSOrtedProducts(products: Product[]) {
    this.filteredProducts = [...products];
    this.showPaginatedRecords();
  }

  onSliderChange(selectedValues: number[]) {
    this._currentValues = selectedValues;
    this.paginatedRecords = this.filteredProducts.filter((product: Product) => {
      return product?.price >= selectedValues[0] && product?.price <= selectedValues[1];
    });
    console.log(selectedValues)
  }
}
