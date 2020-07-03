import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class ListApi {
  loadAll(): void {
    console.log('[List API] loadAll triggerd by handler')
  }
}
