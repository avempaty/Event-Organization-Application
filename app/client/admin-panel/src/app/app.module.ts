import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QRCodeModule } from 'angular2-qrcode';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ModeratorsComponent } from './moderators/moderators.component';

import { UserService } from './user.service';
import { ValidationService } from './validation.service';
import { EventService } from './event.service';
import { HttpModule } from '@angular/http';
import { EventInfoComponent } from './event-info/event-info.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    AttendanceComponent,
    ModeratorsComponent,
    EventInfoComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    QRCodeModule
  ],
  providers: [ EventService, ValidationService, UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
