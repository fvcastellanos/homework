import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AssignmentComponent} from "./assignment/assignment.component";
import {HomeworkComponent} from "./homework/homework.component";
import {UpdateAssignmentComponent} from "./assignment/update-assignment/update-assignment.component";


const routes: Routes = [
  { path: 'assignments/:id', component: UpdateAssignmentComponent },
  { path: 'assignments', component: AssignmentComponent },
  { path: 'homework', component: HomeworkComponent},
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
