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

@NgModule({
  declarations: [
    AppComponent,
    AssignmentComponent,
    HomeComponent,
    HomeworkComponent,
    UpdateAssignmentComponent,
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
