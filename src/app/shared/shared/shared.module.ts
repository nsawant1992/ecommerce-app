import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingStarComponent } from './rating-star/rating-star.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [RatingStarComponent, SearchComponent, PaginationComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [RatingStarComponent, SearchComponent, PaginationComponent]
})
export class SharedModule { }
