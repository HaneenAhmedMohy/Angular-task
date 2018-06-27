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


import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { HomeComponent } from './home/home.component';

import { QueryService } from './query.service';

const routes: Routes=[
  {path:'' , component :HomeComponent },
  {path:'items' , component :ItemsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    HomeComponent
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
    Ng2SearchPipeModule
  ],
  providers: [QueryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
