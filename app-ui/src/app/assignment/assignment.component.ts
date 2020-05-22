import {Component, OnInit} from '@angular/core';
import {AssignmentService} from "./assignment.service";
import {Response} from "./model/response";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Assignment} from "./model/assignment";

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  public apiResponse: Response;
  public form: FormGroup;
  public hideAddModal: boolean;
  public assignment: Assignment;

  constructor(private formBuilder: FormBuilder,
              private assigmentService: AssignmentService) { }

  ngOnInit(): void {

    this.hideAddModal = true;
    this.getAssignments();
    this.buildAddForm();
  }

  getAssignments(): void {

    this.assigmentService.getAll()
      .subscribe(response => {

        console.log(response);
        this.apiResponse = response;

      })
  }

  displayAddModal(display: boolean) : void {

    console.log(`display: ${display}`);
    this.hideAddModal = !display;
    this.buildAddForm();

  }

  buildAddForm(): void {

    this.assignment = new Assignment();

/*
    this.form = this.formBuilder.group({
      name: '',
      description: '',
      email: '',
      copyEmail: ''
    })
*/
    this.form = this.formBuilder.group({

      name: new FormControl(this.assignment.name, [
        Validators.required,
        Validators.maxLength(150)
      ]),
      description: new FormControl(this.assignment.description, [
        Validators.maxLength(300)
      ]),
      email: new FormControl(this.assignment.email, [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]),
      copyEmail: new FormControl(this.assignment.copyEmail, [
        Validators.maxLength(250),
        Validators.email
      ])
    });
  }

  public addAssignment(): void {
    const form = this.form.value;

    console.log(this.assignment.name);
  }
}
