import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PinsListComponent } from './pins-list/pins-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlaySidePanelModule } from './shared/overlay-side-panel/overlay-side-panel.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AddPinComponent } from './add-pin/add-pin.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    PinsListComponent,
    AddCustomerComponent,
    AddPinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OverlayModule,
    OverlaySidePanelModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSelectModule,
    FileUploadModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
