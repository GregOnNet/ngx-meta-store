import {Subject} from "rxjs";
import {shareReplay} from "rxjs/operators";

export class MetaStore<TState> {
  private stateInternal = new Subject<TState>();

  state = this.stateInternal.pipe(shareReplay({bufferSize: 1, refCount: true}));

  set(newState: TState): void {
    this.stateInternal.next(newState);
  }
}
