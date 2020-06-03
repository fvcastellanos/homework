import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import { HomeworkComponent } from './homework/homework.component';
import {ReactiveFormsModule} from "@angular/forms";
import { UpdateAssignmentComponent } from './assignment/update-assignment/update-assignment.component';
import { ApiErrorComponent } from './api-error/api-error.component';

@NgModule({
  declarations: [
    AppComponent,
    AssignmentComponent,
    HomeComponent,
    HomeworkComponent,
    UpdateAssignmentComponent,
    ApiErrorComponent,
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
