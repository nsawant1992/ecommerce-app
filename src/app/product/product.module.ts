import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { ProductService } from './product.service';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from "../shared/shared/shared.module";
import { HttpErrorInterceptor } from '../shared/http-error.interceptor';
import { NpnSliderModule } from "npn-slider";

@NgModule({
  declarations: [
    ProductComponent,
    CategoryFilterComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgbModule,
    HttpClientModule,
    SharedModule,
    NpnSliderModule
  ],
  providers: [ProductService, {

    provide: HTTP_INTERCEPTORS,

    useClass: HttpErrorInterceptor,

    multi: true

  }]
})
export class ProductModule { }
