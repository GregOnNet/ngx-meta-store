import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { MetaStoreEvent } from './meta-store-event'
import { shareReplay, tap } from 'rxjs/operators'

export function metaStoreEventBusWritable(): Subject<MetaStoreEvent> {
  return (globalThis as any).__meta_store_events__
}

export function metaStoreEventBusReadable(): Observable<MetaStoreEvent> {
  return (globalThis as any).__meta_store_events__.asObservable().pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
    tap(event => console.log(event))
  )
}

@Injectable({
  providedIn: 'root',
  useFactory: metaStoreEventBusReadable,
})
export class MetaStoreEventBus extends Observable<MetaStoreEvent> {}
