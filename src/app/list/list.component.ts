import { Component, OnInit } from '@angular/core'
import { ListHandler } from './list.handler.service'

@Component({
  selector: 'hdl-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
})
export class ListComponent implements OnInit {
  constructor(private listHandler: ListHandler) {}

  ngOnInit(): void {}
}
