import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AssignmentService} from "./assignment.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Assignment} from "./model/assignment";
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
  deleteId: number;
  deleteIndex: number;
  deleteName: string;
  assignment: Assignment;

  @ViewChild("closeModal")
  public closeModalButton: ElementRef;

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

      const value = this.form.value;
      this.assigmentService.add(value)
        .subscribe(response => {

          const newAssignment = response;
          newAssignment.id = UrlHelperService.getIdFromResource(response._links['self'].href);

          this.assignmentList.push(newAssignment);
        }, error => {

          console.log(error);
        });

      this.closeAddModal();
    }
  }

  confirmDelete(name: string, id: number, index: number) {

    console.log(`name: ${name}, id: ${id}`);
    this.deleteName = name;
    this.deleteId = id;
    this.deleteIndex = index;
  }

  deleteAssignment(id: number, index: number) : void {

    this.assigmentService.delete(id).subscribe(response => {
      this.assignmentList.splice(index, 1);
    });
  }

  viewAssignment(index: number): void {

    this.assignment = this.assignmentList[index];
  }

  get f() {
    return this.form.controls;
  }

  // ----------------------------------------------------------------------------------------

  private closeAddModal() {
    this.closeModalButton.nativeElement.click();
  }
}
