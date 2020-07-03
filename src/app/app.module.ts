import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MetaStoreEventHandlerModule, MetaStoreModule } from '@meta-store'
import { AppComponent } from './app.component'
import { FilterComponent } from './filter/filter.component'
import { ListComponent } from './list/list.component'
import { ListHandler } from './list/list.handler.service'

@NgModule({
  declarations: [AppComponent, FilterComponent, ListComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MetaStoreModule.forRoot(),
    MetaStoreEventHandlerModule.register([ListHandler]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
