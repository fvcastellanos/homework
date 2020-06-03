import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AssignmentService} from "./assignment.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Assignment} from "./model/assignment";
import {UrlHelperService} from "../helper/url-helper.service";
import {BaseAddComponent} from "../base/base-add-component";

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent extends BaseAddComponent implements OnInit {

  assignmentList: Assignment[];
  assignment: Assignment;

  constructor(private formBuilder: FormBuilder,
              private assigmentService: AssignmentService) {
    super();
  }

  ngOnInit(): void {

    this.getAssignments();
    this.buildAddForm();
  }

  getAssignments(): void {

    this.cleanMessages();
    this.assignmentList = [];
    this.assigmentService.getAll().subscribe(response => {

      console.log(`got response: ${response}`);

      this.assignmentList = response._embedded.assignments;

      this.assignmentList.forEach(assignment => {
        assignment.id = UrlHelperService.getIdFromResource(assignment._links['self'].href);
      });

    },error => this.handleError(error));
  }

  buildAddForm(): void {

    this.cleanMessages();
    this.formSubmitted = false;
    this.form = this.formBuilder.group({

      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(150)
      ]),
      description: new FormControl('', [
        Validators.maxLength(300)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]),
      copyEmail: new FormControl('', [
        Validators.maxLength(250),
        Validators.email
      ])
    });

    console.log(`form created: ${this.form}`);
  }

  addAssignment(): void {
    this.formSubmitted = true;

    console.log('save button pressed');

    if (this.form.valid) {

      console.log('form is valid');

      const value = this.form.value;
      this.assigmentService.add(value)
        .subscribe(response => {

          const newAssignment = response;
          newAssignment.id = UrlHelperService.getIdFromResource(response._links['self'].href);
          this.assignmentList.push(newAssignment);

        }, error => this.handleError(error));

      this.closeAddModal();
    }
  }

  deleteAssignment(id: number, index: number) : void {

    this.assigmentService.delete(id).subscribe(response => {

      this.assignmentList.splice(index, 1);

    }, error => this.handleError(error));
  }

  viewAssignment(index: number): void {

    this.assignment = this.assignmentList[index];
  }

  reloadData(): void {

    this.assignmentList = [];
    this.getAssignments();
  }

}
