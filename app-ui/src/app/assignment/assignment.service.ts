import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Response} from "./model/response";
import {Assignment} from "./model/assignment";

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

  public add(assignment: Assignment): Observable<Assignment> {

    return this.httpClient.post<Assignment>(this.AssigmentUri, assignment);
  }

  public delete(assignmentUri: string) : void {

    this.httpClient.delete(assignmentUri)
      .subscribe(response => {
        console.log(`response: ${response}`);
      }, error => {
        console.log(`error: ${error}`);
      });
  }
}
