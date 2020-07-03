import { Inject, Injectable, InjectionToken } from '@angular/core'
import { MetaStoreEventHandler } from './meta-store-event-handler'
import { MetaStoreEventCatalog } from './meta-store-event-catalog'

export const HANDLERS = new InjectionToken('META_STORE_EVENT_HANDLERS')

@Injectable({ providedIn: 'root' })
export class MetaStoreEventHandlerRegisterer {
  private catalog = new MetaStoreEventCatalog()

  constructor(@Inject(HANDLERS) private handlers: MetaStoreEventHandler[][]) {
    // @TODO find out why we receive a nested list
    this.registerHandlers(handlers.flat())
  }

  registerHandlers(handlers: MetaStoreEventHandler[]) {
    handlers.forEach(handler => handler.register(this.catalog))
  }
}
