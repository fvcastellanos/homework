import {Component, OnInit} from '@angular/core';
import {AssignmentService} from "./assignment.service";
import {Response} from "./model/response";

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  public apiResponse: Response;

  constructor(private assigmentService: AssignmentService) { }

  ngOnInit(): void {

    this.getAssignments();
  }

  getAssignments(): void {

    this.assigmentService.getAll()
      .subscribe(response => {

        console.log(response);
        this.apiResponse = response;

      })
  }

}
