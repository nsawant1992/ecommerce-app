import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-star',
  templateUrl: './rating-star.component.html',
  styleUrls: ['./rating-star.component.scss']
})
export class RatingStarComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  @Input() rate: number = 0;

  constructor() { }

  ngOnInit(): void {}
}
