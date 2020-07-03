import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'

interface MetaEvent {
  meta?: string
}

export function metaEventBus(): Subject<MetaEvent> {
  if (!(globalThis as any).__meta_store_events__) {
    ;(globalThis as any).__meta_store_events__ = new Subject<MetaEvent>()
  }

  return (globalThis as any).__meta_store_events__
}

@Injectable({
  providedIn: 'root',
  useFactory: () => metaEventBus().asObservable(),
})
export class MetaEventStream extends Observable<MetaEvent> {}
