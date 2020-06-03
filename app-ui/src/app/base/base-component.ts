import {FormGroup} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

export abstract class BaseComponent {

  form: FormGroup;
  formSubmitted: boolean;
  apiError: HttpErrorResponse;

  get f() {
    return this.form.controls;
  }

  protected cleanMessages(): void {

    this.handleError(null);
  }

  protected handleError(error: HttpErrorResponse): void {

    this.apiError = error;
  }

}
