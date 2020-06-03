import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Homework} from "./model/homework";
import {HomeworkResponse} from "./model/homework-response";

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {

  private HomeworkUrl = `${environment.homeworkApi}/tasks`;

  constructor(private httpClient: HttpClient) {
  }

  public getAll(): Observable<HomeworkResponse> {

    return this.httpClient.get<HomeworkResponse>(this.HomeworkUrl);
  }

  public getById(id: number): Observable<Homework> {

    let url = `${this.HomeworkUrl}/${id}`;
    return this.httpClient.get<Homework>(url);
  }

  public add(homework: Homework): Observable<Homework> {

    return this.httpClient.post<Homework>(this.HomeworkUrl, homework);
  }

  public delete(id: number) : Observable<any> {

    let url = `${this.HomeworkUrl}/${id}`;

    return this.httpClient.delete(url);
  }

  update(homework: Homework): Observable<Homework> {

    let url = `${this.HomeworkUrl}/${homework.id}`;
    return this.httpClient.put<Homework>(url, homework);
  }

}
