import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    ListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
