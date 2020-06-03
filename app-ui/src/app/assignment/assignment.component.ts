import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AssignmentService} from "./assignment.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Assignment} from "./model/assignment";
import {UrlHelperService} from "../helper/url-helper.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ApiError} from "../model/api-error";

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  assignmentList: Assignment[];
  form: FormGroup;
  formSubmitted: boolean;
  deleteId: number;
  deleteIndex: number;
  deleteName: string;
  assignment: Assignment;
  apiError: HttpErrorResponse;
  // globalErrors: string[];

  @ViewChild("closeModal")
  public closeModalButton: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private assigmentService: AssignmentService) { }

  ngOnInit(): void {

    this.getAssignments();
    this.buildAddForm();
  }

  getAssignments(): void {

    // this.globalErrors = [];
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

    // this.globalErrors = [];
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

  confirmDelete(name: string, id: number, index: number) {

    // this.globalErrors = [];
    console.log(`name: ${name}, id: ${id}`);
    this.deleteName = name;
    this.deleteId = id;
    this.deleteIndex = index;
  }

  deleteAssignment(id: number, index: number) : void {

    this.assigmentService.delete(id).subscribe(response => {
      this.assignmentList.splice(index, 1);
    }, error => this.handleError(error));
  }

  viewAssignment(index: number): void {

    // this.globalErrors = [];
    this.assignment = this.assignmentList[index];
  }

  reloadData(): void {

    // this.globalErrors = [];
    this.assignmentList = [];
    this.getAssignments();
  }

  get f() {
    return this.form.controls;
  }

  // ----------------------------------------------------------------------------------------

  private closeAddModal() {
    this.closeModalButton.nativeElement.click();
  }

  private handleError(error: HttpErrorResponse): void {

    this.apiError = error;
/*
    if (error.status == 400) {
      const errors : ApiError [] = error.error.errors;
      errors.forEach(error => {
        this.globalErrors.push(`${error.entity}.${error.property} has invalid value: ${error.invalidValue} with message: ${error.message}`);
      });

      return;
    }

    this.globalErrors.push("Can't perform operation");
    console.error(error.statusText);
*/
  }
}
