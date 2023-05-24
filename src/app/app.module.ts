import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { AddWishesComponent } from './add-wishes/add-wishes.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ImageModule} from 'primeng/image';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ViewAllComponent,
    AddWishesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    InputTextareaModule,
    ImageModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
