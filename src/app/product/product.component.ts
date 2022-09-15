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
  _currentValues: number[] = [];
  selectedCategories: string[] = [];
  searchText: string = "";

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
      this.selectedCategories = this.categories;
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
    this.searchText = searchValue;
    this.filterRecords();
  }

  filterByCategory(categories: string[]) {

    if (categories?.length > 0) {
      this.selectedCategories = categories;
    } else {
      this.selectedCategories = this.categories;
    }
    this.filterRecords();
  }

  showPaginatedRecords(activePage: number = 1) {
    this.paginatedRecords = this.filteredProducts.slice((activePage - 1) * this.pageSize, activePage * this.pageSize);
  }

  paginateSortedProducts(products: Product[]) {
    this.filteredProducts = [...products];
    this.showPaginatedRecords();
  }

  onSliderChange(selectedValues: number[]) {
    this._currentValues = selectedValues;
    this.filterRecords();
  }

  filterRecords() {
    //Apply all the filters
    this.filteredProducts = this.products.filter((product: Product) => {
      return this.selectedCategories.includes(product.category) && product?.price >= this._currentValues[0] && product?.price <= this._currentValues[1];
    });

    if (this.searchText) {
      this.filteredProducts = this.filteredProducts.filter((product: Product) => {
        return product.title.toLowerCase().includes(this.searchText?.toLowerCase());
      });
    } else {
      this.filteredProducts = this.products.filter((product: Product) => {
        return this.selectedCategories.includes(product.category) && product?.price >= this._currentValues[0] && product?.price <= this._currentValues[1];
      });
    }
    this.showPaginatedRecords();
  }
}
