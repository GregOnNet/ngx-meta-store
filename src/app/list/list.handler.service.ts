import { Injectable } from '@angular/core'
import { ListApi } from './list-api.service'
import {
  forReset,
  forUpdate,
  MetaStoreEventCatalog,
  MetaStoreEventHandler,
} from '@meta-store'
import { Filter } from '../filter/filter-store.service'

@Injectable()
export class ListHandler implements MetaStoreEventHandler {
  constructor(private listApi: ListApi) {}

  register = (catalog: MetaStoreEventCatalog) => {
    catalog.watch(forUpdate(Filter), _event => this.listApi.loadAll())
    catalog.watch(forReset(Filter), _event => this.listApi.loadAll())
  }
}
