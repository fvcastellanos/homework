import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Homework} from "../model/homework/homework";
import {HomeworkResponse} from "../model/homework/homework-response";

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {

  private HomeworkUrl = `${environment.homeworkApi}/tasks`;
  private AssignmentUrl = `${environment.homeworkApi}/assignments`;

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

    const foo = {
      name: homework.name,
      description: homework.description,
      due: homework.due,
      assignment: `${this.AssignmentUrl}/${homework.assignment.pk}`
    };

    return this.httpClient.post<Homework>(this.HomeworkUrl, foo);
  }

  public delete(id: number) : Observable<any> {

    let url = `${this.HomeworkUrl}/${id}`;

    return this.httpClient.delete(url);
  }

  update(homework: Homework): Observable<Homework> {

    let url = `${this.HomeworkUrl}/${homework.pk}`;
    return this.httpClient.put<Homework>(url, homework);
  }

}
