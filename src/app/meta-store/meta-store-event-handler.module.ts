import { CommonModule } from '@angular/common'
import { Injector, ModuleWithProviders, NgModule } from '@angular/core'
import { MetaStoreEventHandler } from './meta-store-event-handler'
import { Constructor } from './constructor'
import {
  HANDLERS,
  MetaStoreEventHandlerRegisterer,
} from './meta-store-event-handler.service'

@NgModule({
  imports: [CommonModule],
})
export class MetaStoreEventHandlerModule {
  constructor(handlerRegisterer: MetaStoreEventHandlerRegisterer) {}
  static register(
    handlers: Constructor<MetaStoreEventHandler>[]
  ): ModuleWithProviders<MetaStoreEventHandlerModule> {
    return {
      ngModule: MetaStoreEventHandlerModule,
      providers: [
        handlers,
        {
          provide: HANDLERS,
          multi: true,
          useFactory: (injector: Injector) =>
            createHandlers(injector, handlers),
          deps: [Injector],
        },
      ],
    }
  }
}

export function createHandlers(
  injector: Injector,
  handlers: Constructor<MetaStoreEventHandler>[]
) {
  return handlers.map(handler => injector.get(handler))
}
