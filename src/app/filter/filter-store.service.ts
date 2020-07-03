import {Injectable} from '@angular/core'
import {MetaStore, MetaStoreState} from '../meta-store/meta-store.service'

export class Filter extends  MetaStoreState{
  getStoreName = () => 'Filter';
  name = 'Gregor'
  age = 31
}

@Injectable({ providedIn: 'root' })
export class FilterStore extends MetaStore<Filter> {
  constructor() {
    super(new Filter())
  }
}
