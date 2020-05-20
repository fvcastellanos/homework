import {Component, OnInit} from '@angular/core';
import {AssigmentService} from "./assigment.service";
import {Response} from "./model/response";

@Component({
  selector: 'app-assigment',
  templateUrl: './assigment.component.html',
  styleUrls: ['./assigment.component.css']
})
export class AssigmentComponent implements OnInit {

  public apiResponse: Response;

  constructor(private assigmentService: AssigmentService) { }

  ngOnInit(): void {

    this.getAssigments();
  }

  getAssigments(): void {

    this.assigmentService.getAll()
      .subscribe(response =>{

        console.log(response);
        this.apiResponse = response;

      })
  }

}
