import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AssignmentService} from "../assignment.service";
import {ActivatedRoute} from "@angular/router";
import {Assignment} from "../model/assignment";

@Component({
  selector: 'app-update-assignment',
  templateUrl: './update-assignment.component.html',
  styleUrls: ['./update-assignment.component.css']
})
export class UpdateAssignmentComponent implements OnInit {

  formSubmitted: boolean;
  form: FormGroup;
  assignmentId: string;
  assignment: Assignment;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private assigmentService: AssignmentService) { }

  ngOnInit(): void {

    this.formSubmitted = false;
    this.buildUpdateForm();

    this.route.paramMap.subscribe(param => {
      console.info(`param: ${param}`);
      this.assignmentId = param['id'];
    });

  }

  buildUpdateForm(): void {

    let value = this.assigmentService.getById(this.assignmentId).subscribe(a => {
      this.assignment = new Assignment();
      this.assignment.id = this.assignmentId;
      this.assignment.name = a.name;
    });

    this.form = this.formBuilder.group({

      name: new FormControl(this.assignment.name, [
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

  updateAssignment(): void {

  }

  get f() {
    return this.form.controls;
  }
}
