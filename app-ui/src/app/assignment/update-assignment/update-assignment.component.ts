import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AssignmentService} from "../assignment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Assignment} from "../model/assignment";

@Component({
  selector: 'app-update-assignment',
  templateUrl: './update-assignment.component.html',
  styleUrls: ['./update-assignment.component.css']
})
export class UpdateAssignmentComponent implements OnInit {

  formSubmitted: boolean;
  form: FormGroup;
  assignmentId: number;
  assignment: Assignment;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private assigmentService: AssignmentService) { }

  ngOnInit(): void {
    this.formSubmitted = false;
    this.buildUpdateForm();
    this.getAssignmentIdPathParameter();
    this.loadAssignment(this.assignmentId);
  }

  getAssignmentIdPathParameter(): void {

    this.activatedRoute.params.subscribe(param => {

      this.assignmentId = param['id'];
      console.info(`id: ${this.assignmentId}`);
    });
  }

  loadAssignment(id: number): void {

    this.assigmentService.getById(id).subscribe(assignment => {

      console.info(`name: ${assignment.name}`);

      this.assignment = new Assignment();
      this.assignment.id = id;
      this.assignment.name = assignment.name;
      this.assignment.description = assignment.description;
      this.assignment.email = assignment.email;
      this.assignment.copyEmail = assignment.copyEmail;

      this.buildUpdateForm();

    });
  }

  buildUpdateForm(): void {

    this.form = this.formBuilder.group({

      id: new FormControl(this.assignment ? this.assignment.id: 0),
      name: new FormControl(this.assignment ? this.assignment.name: '', [
        Validators.required,
        Validators.maxLength(150)
      ]),
      description: new FormControl(this.assignment ? this.assignment.description: '', [
        Validators.maxLength(300)
      ]),
      email: new FormControl(this.assignment ? this.assignment.email: '', [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]),
      copyEmail: new FormControl(this.assignment ? this.assignment.copyEmail: '', [
        Validators.maxLength(250),
        Validators.email
      ])
    });

    console.log(`form created: ${this.form}`);
  }

  updateAssignment(): void {

    this.formSubmitted = true;

    if (this.form.valid) {

      let assignment = new Assignment();
      assignment.id = this.form.controls.id.value;
      assignment.name = this.form.controls.name.value;
      assignment.description = this.form.controls.description.value;
      assignment.email = this.form.controls.email.value;
      assignment.copyEmail = this.form.controls.copyEmail.value;

      this.assigmentService.update(assignment).subscribe(response => {

        console.info(response);
      }, error => {

        console.error(error);
      });

      this.router.navigate(['assignments']);
    }

  }

  get f() {
    return this.form.controls;
  }
}
