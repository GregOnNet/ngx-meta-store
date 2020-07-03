import { Injectable } from '@angular/core'
import { MetaEventStream } from '../meta-event-bus.service'

@Injectable({ providedIn: 'root' })
export class ListHandler {
  constructor(private eventStream: MetaEventStream) {
    this.eventStream.subscribe(event => this.load())
  }

  load(): void {
    console.log('Loading')
  }
}
