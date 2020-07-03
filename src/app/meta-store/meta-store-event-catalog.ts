import { MetaStoreEvent } from './meta-store-event'
import { metaStoreEventBusReadable } from './meta-store-event-bus.service'

export class MetaStoreEventCatalog {
  private watchList: Map<
    MetaStoreEvent,
    ((event: MetaStoreEvent) => void)[]
  > = new Map()

  constructor() {
    this.listenForEvents()
  }

  watch(event: MetaStoreEvent, continuation: (event: MetaStoreEvent) => void) {
    !this.watchList.has(event)
      ? this.createEntry(event, continuation)
      : this.updateEntry(event, continuation)
  }

  private listenForEvents() {
    metaStoreEventBusReadable().subscribe({
      next: event => this.executeContinuations(event),
    })
  }

  private executeContinuations(event: MetaStoreEvent) {
    // @TODO find a way to create unique keys out of model and event name
    const name = (event as any).state.getStoreName()
    ;(this.watchList.get(name) || []).forEach(continuation =>
      continuation(event)
    )
  }

  private createEntry(
    event: MetaStoreEvent,
    continuation: (event: MetaStoreEvent) => void
  ) {
    const name = (event as any).state.getStoreName()
    this.watchList.set(name, [continuation])
  }

  private updateEntry(
    entry: any,
    continuation: (event: MetaStoreEvent) => void
  ) {
    const existingContinuations = this.watchList.get(entry) || []
    this.watchList.set(entry, [...existingContinuations, continuation])
  }
}
