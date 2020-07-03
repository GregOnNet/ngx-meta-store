import { Draft, produce } from 'immer'
import { BehaviorSubject, Observable } from 'rxjs'
import { shareReplay } from 'rxjs/operators'
import { metaEventBus } from './meta-event-bus.service'

export class MetaStore<TState> {
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
    metaEventBus().next(nextState)
  }

  reset(): void {
    this.stateInternal.next(this.initialState)
  }
}
