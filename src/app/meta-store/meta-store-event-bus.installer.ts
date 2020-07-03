import { Subject } from 'rxjs'
import { MetaStoreEvent } from './meta-store-event'

export function installMetaStoreEventBus(): void {
  ;(globalThis as any).__meta_store_events__ = new Subject<MetaStoreEvent>()
}
