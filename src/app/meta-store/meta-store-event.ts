import { MetaStoreState } from './meta-store.service'
import { Constructor } from './constructor'

export interface MetaStoreEvent {
  state: unknown
}

export function forUpdate<T extends MetaStoreState>(
  token: Constructor<T>
): MetaStoreUpdate<T> {
  return new MetaStoreUpdate(new token())
}

export class MetaStoreUpdate<TState> implements MetaStoreEvent {
  constructor(public state: TState) {}
}

export function forReset<T extends MetaStoreState>(
  token: Constructor<T>
): MetaStoreReset<T> {
  return new MetaStoreReset(new token())
}

export class MetaStoreReset<TState> implements MetaStoreEvent {
  constructor(public state: TState) {}
}
