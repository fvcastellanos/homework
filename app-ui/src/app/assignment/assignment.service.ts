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

    return this.httpClient.get<Response>(this.AssigmentUri);
  }

  public getById(id: number): Observable<Assignment> {

    let url = `${this.AssigmentUri}/${id}`;
    return this.httpClient.get<Assignment>(url);
  }

  public add(assignment: Assignment): Observable<Assignment> {

    return this.httpClient.post<Assignment>(this.AssigmentUri, assignment);
  }

  public delete(id: number) : Observable<any> {

    let url = `${this.AssigmentUri}/${id}`;

    return this.httpClient.delete(url);
  }

  update(assignment: Assignment): Observable<Assignment> {

    let url = `${this.AssigmentUri}/${assignment.id}`;
    return this.httpClient.put<Assignment>(url, assignment);
  }
}
