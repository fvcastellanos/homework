import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ApiError} from "../model/api-error";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-api-error',
  templateUrl: './api-error.component.html',
  styleUrls: ['./api-error.component.css']
})
export class ApiErrorComponent implements OnChanges {

  globalErrors: string[];
  @Input() responseError!: HttpErrorResponse;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {

    let apiError = changes.responseError.currentValue;
    console.info(`API error change detected`);
    this.handleError(apiError);
  }

  private handleError(error: HttpErrorResponse): void {

    if (error == null) {
      this.globalErrors = [];
      return;
    }

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
