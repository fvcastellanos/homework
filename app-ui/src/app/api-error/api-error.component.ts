import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ApiError} from "../model/api-error";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-api-error',
  templateUrl: './api-error.component.html',
  styleUrls: ['./api-error.component.css']
})
export class ApiErrorComponent implements OnInit, OnChanges {

  globalErrors: string[];
  @Input() responseError!: HttpErrorResponse;

  constructor() { }

  ngOnInit(): void {
    // console.info(`error: ${this.responseError}`);
    // this.handleError(this.responseError);
  }

  ngOnChanges(changes: SimpleChanges): void {

    console.info(`changes: ${changes}`);

    // this.handleError(changes.responseError);
  }

  private handleError(error: HttpErrorResponse): void {

    if (error.status == 400) {
      const errors : ApiError [] = error.error.errors;
      errors.forEach(error => {
        this.globalErrors.push(`${error.entity}.${error.property} has invalid value: ${error.invalidValue} with message: ${error.message}`);
      });

      return;
    }

    this.globalErrors.push("Can't perform operation");
    console.error(error.statusText);
  }
}
