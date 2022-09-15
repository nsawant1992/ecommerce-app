import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {

  @Input() categories: string[] = [];
  selectedCategories: string[] = [];
  @Output() onCategorySelect = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {
  }

  updateSelectedCategories(event: any) {
    if (event.srcElement.checked && this.selectedCategories.indexOf(event.srcElement.name) == -1) {
      this.selectedCategories.push(event.srcElement.name);
    } else {
      this.selectedCategories.splice(this.selectedCategories.indexOf(event.srcElement.name), 1);
    }
    this.onCategorySelect.emit(this.selectedCategories);
  }

}
