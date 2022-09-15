import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchText: string = "";

  constructor(public sharedService: SharedService) { }

  ngOnInit(): void {
  }

  onSearchtextChange(data: string) {
    this.sharedService.searchTextUpdate.next(data);
  }

}
