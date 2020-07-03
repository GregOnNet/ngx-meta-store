import { Component, OnInit } from '@angular/core'
import { FilterStore } from './filter-store.service'

@Component({
  selector: 'hdl-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass'],
})
export class FilterComponent implements OnInit {
  constructor(private filterStore: FilterStore) {}

  ngOnInit(): void {
    this.filterStore.update(state => {
      state.age = 13
    })
  }
}
