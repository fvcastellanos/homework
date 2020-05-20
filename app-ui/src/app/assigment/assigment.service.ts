import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Response} from "./model/response";

@Injectable({
  providedIn: 'root'
})
export class AssigmentService {

  private AssigmentUri = `${environment.homeworkApi}/assigments`;

  constructor(private httpClient: HttpClient) {
  }

  public getAll(): Observable<Response> {

    console.log("assigment uri: ", this.AssigmentUri);
    return this.httpClient.get<Response>(this.AssigmentUri);
  }
}
