import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Response} from "./model/response";

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private AssigmentUri = `${environment.homeworkApi}/assignments`;

  constructor(private httpClient: HttpClient) {
  }

  public getAll(): Observable<Response> {

    console.log("assignment uri: ", this.AssigmentUri);
    return this.httpClient.get<Response>(this.AssigmentUri);
  }
}
