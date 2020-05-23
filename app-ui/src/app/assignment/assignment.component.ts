import {Component, OnInit} from '@angular/core';
import {AssignmentService} from "./assignment.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Assignment} from "./model/assignment";
import * as $ from "jquery";
import {UrlHelperService} from "../helper/url-helper.service";

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  assignmentList: Assignment[];
  form: FormGroup;
  formSubmitted: boolean;
  deleteId: string;
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
        this.assignmentList = response._embedded.assignments;

        this.assignmentList.forEach(assignment => {
          assignment.id = UrlHelperService.getIdFromResource(assignment._links['self'].href);
        });

      });
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

      AssignmentComponent.closeAddModal();
      location.reload();
    }
  }

  confirmDelete(name: string, url: string) {

    console.log(`name: ${name}, id: ${url}`);
    this.deleteName = name;
    this.deleteId = url;
  }

  deleteAssignment(url: string) : void {

    this.assigmentService.delete(url);
    location.reload();
  }

  get f() {
    return this.form.controls;
  }

  private static closeAddModal() {
    $("#modalClose").click();
  }
}
