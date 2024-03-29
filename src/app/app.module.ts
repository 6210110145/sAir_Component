import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule, 
  NbSidebarModule, 
  NbButtonModule, 
  NbAccordionModule, 
  NbInputModule,
  NbCardModule,
  NbMenuModule,
  NbDialogModule,
  NbIconModule,
  NbPopoverModule,
  NbToastrModule,
  NbSpinnerModule,
  NbListModule,
  NbSelectModule,
  NbToggleModule} from '@nebular/theme';
import { AirComponent } from './air/air.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UiSwitchModule } from 'ngx-ui-switch';

@NgModule({
  declarations: [
    AppComponent,
    AirComponent  
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSpinnerModule,
    NbListModule,
    NbButtonModule,
    NbLayoutModule,
    NbAccordionModule,
    NbInputModule,
    NbCardModule,
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    NbEvaIconsModule,
    NbIconModule,
    NbPopoverModule,
    NbSelectModule,
    NbToggleModule,
    UiSwitchModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
