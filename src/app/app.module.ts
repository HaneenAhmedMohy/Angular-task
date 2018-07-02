import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, NgModel } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';

import { QueryService } from './query.service';

const routes: Routes=[
  {path:'' , component :ItemsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
  ],
  imports: [
  	NgbModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    AngularFontAwesomeModule
  ],
  providers: [QueryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
