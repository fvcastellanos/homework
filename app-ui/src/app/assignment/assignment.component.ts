import {Component, OnInit} from '@angular/core';
import {AssignmentService} from "./assignment.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Assignment} from "./model/assignment";
import * as $ from "jquery";

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  assignmentList: Assignment[];
  form: FormGroup;
  formSubmitted: boolean;
  deleteUrl: string;
  deleteName: string;

  constructor(private formBuilder: FormBuilder,
              private assigmentService: AssignmentService) { }

  ngOnInit(): void {

    this.getAssignments();
    this.buildAddForm();
  }

  getAssignments(): void {

    this.assigmentService.getAll()
      .subscribe(response => {

        console.log(`got response: ${response}`);
        this.assignmentList = response._embedded.assignments
      });
  }

  displayAddForm(): void {
    this.buildAddForm();
  }

  buildAddForm(): void {

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

      const form = this.form.value;
      let value = new Assignment();

      value.name = form.name;
      value.description = form.description;
      value.email = form.email;
      value.copyEmail = form.copyEmail;

      this.assigmentService.add(value)
        .subscribe(response => {

          console.log(response);
        }, error => {

          console.log(error);
        });

      this.closeAddModal();
      window.location.reload();
    }
  }

  confirmDelete(name: string, url: string) {

    console.log(`name: ${name}, url: ${url}`);
    this.deleteName = name;
    this.deleteUrl = url;
  }

  deleteAssignment(url: string) : void {

    this.assigmentService.delete(url);
    window.location.reload();
  }

  get f() {
    return this.form.controls;
  }

  private closeAddModal() {
    $("#modalClose").click();
  }
}
