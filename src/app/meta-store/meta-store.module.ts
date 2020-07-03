import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { installMetaStoreEventBus } from './meta-store-event-bus.installer'

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class MetaStoreModule {
  static forRoot(): ModuleWithProviders<MetaStoreModule> {
    installMetaStoreEventBus()

    return {
      ngModule: MetaStoreModule,
    }
  }
}
