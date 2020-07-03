import { Draft, immerable, produce } from 'immer'
import { BehaviorSubject, Observable } from 'rxjs'
import { shareReplay } from 'rxjs/operators'
import { metaStoreEventBusWritable } from './meta-store-event-bus.service'
import { MetaStoreReset, MetaStoreUpdate } from './meta-store-event'

export abstract class MetaStoreState {
  [immerable] = true
  abstract getStoreName(): string
}

export class MetaStore<TState extends MetaStoreState> {
  private stateInternal: BehaviorSubject<TState>

  state: Observable<TState>

  constructor(private initialState: TState) {
    this.stateInternal = new BehaviorSubject(initialState)

    this.state = this.stateInternal.pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    )
  }

  update(mutation: (state: Draft<TState>) => void): void {
    const nextState = produce(this.stateInternal.getValue(), draft => {
      mutation(draft)
    })

    this.stateInternal.next(nextState)

    metaStoreEventBusWritable().next(new MetaStoreUpdate(nextState))
  }

  reset(): void {
    this.stateInternal.next(this.initialState)

    metaStoreEventBusWritable().next(new MetaStoreReset(this.initialState))
  }
}
