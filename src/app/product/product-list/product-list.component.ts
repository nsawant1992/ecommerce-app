import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/shared/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() totalRecords: number = 0;
  @Output() paginate = new EventEmitter<number>();
  @Output() onProductSort = new EventEmitter<Product[]>();
  sortOrder: string = "Asc"; // Default sorting
  activePage: number = 0;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  sortProducts(sortOrder: string) {
    this.sortOrder = sortOrder;
    this.productService.sortProducts(sortOrder?.toLowerCase()).subscribe((products) => {
      this.onProductSort.emit(products);
    })
  
  }

  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber;
    this.paginate.emit(this.activePage);
  }
}
