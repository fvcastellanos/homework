import { Component, OnInit } from '@angular/core';
import {BaseAddComponent} from "../base/base-add-component";
import {Homework} from "./model/homework";
import {FormBuilder} from "@angular/forms";
import {HomeworkService} from "./homework.service";
import {UrlHelperService} from "../helper/url-helper.service";

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent extends BaseAddComponent implements OnInit {

  homeworkList: Homework[];
  homework: Homework;

  constructor(private formBuilder: FormBuilder,
              private homeworkService: HomeworkService) {
    super();
  }

  ngOnInit(): void {

    this.getHomeworkList();
  }

  getHomeworkList() {

    this.cleanMessages();
    this.homeworkList = [];
    this.homeworkService.getAll().subscribe(response => {

      console.log(`got response: ${response}`);

      this.homeworkList = response._embedded.homework;

      this.homeworkList.forEach(homework => {
        homework.id = UrlHelperService.getIdFromResource(homework._links['self'].href);
      });

    }, error => this.handleError(error));
  }
}
