import {Component, OnInit} from '@angular/core';
import {BaseAddComponent} from "../base/base-add-component";
import {Homework} from "../model/homework/homework";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {HomeworkService} from "../services/homework.service";
import {AssignmentService} from "../services/assignment.service";
import {Assignment} from "../model/assignment/assignment";

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent extends BaseAddComponent implements OnInit {

  homeworkList: Homework[];
  assignmentList: Assignment[];
  homework: Homework;

  constructor(private formBuilder: FormBuilder,
              private homeworkService: HomeworkService,
              private assignmentService: AssignmentService) {
    super();
  }

  ngOnInit(): void {

    this.reloadData();
    this.buildAddForm();
  }

  getAssignmentList() {

    this.assignmentList = [];

    this.assignmentService.getAll().subscribe(response => {

      this.assignmentList = response._embedded.assignments;
    }, error => this.handleError(error));
  }

  getHomeworkList() {

    this.cleanMessages();
    this.homeworkList = [];
    this.homeworkService.getAll().subscribe(response => {

      console.log(`got response: ${response}`);
      this.homeworkList = response._embedded.homework;

    }, error => this.handleError(error));
  }

  buildAddForm() {

    this.cleanMessages();
    this.formSubmitted = false;
    this.form = this.formBuilder.group({

      assignment: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(150)
      ]),
      description: new FormControl('', [
        Validators.maxLength(300)
      ]),
      due: new FormControl('', [
        Validators.required
      ])
    });
  }

  reloadData() {
    this.getHomeworkList();
    this.getAssignmentList();
  }

  view(id: number) {

  }

  add() {
    this.formSubmitted = true;

    console.log('save button pressed');

    if (this.form.valid) {

      console.log('form is valid');

      const homework = HomeworkComponent.buildHomework(this.form.value);

      console.info(`homework: ${JSON.stringify(homework)}`);

      this.homeworkService.add(homework).subscribe(response =>{

        this.homeworkList.push(homework);
      }, error => this.handleError(error));

      this.closeAddModal();
    }

  }

  delete(deleteId: number, deleteIndex: number) {

    this.homeworkService.delete(deleteId).subscribe(response => {

      this.homeworkList.splice(deleteIndex, 1);
    }, error => this.handleError(error));
  }

  // -------------------------------------------------------------------------------------------

  private static buildHomework(value): Homework {

    const assignment: Assignment = new Assignment();
    const foo: string[] = value.assignment.split("-");
    assignment.pk = Number.parseInt(foo[0]);
    assignment.name = foo[1];

    let homework: Homework = value;
    const date = new Date(value.due).toISOString();
    homework.assignment = assignment;
    homework.due = new Date(date);

    return homework;
  }

}
