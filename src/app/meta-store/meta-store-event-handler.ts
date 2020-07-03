import { MetaStoreEventCatalog } from './meta-store-event-catalog'

export interface MetaStoreEventHandler {
  register: (catalog: MetaStoreEventCatalog) => void
}
