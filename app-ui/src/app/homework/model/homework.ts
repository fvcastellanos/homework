import {Href} from "../../model/href";

export class Homework {
  id: number;
  assignmentId: number;
  name: string;
  description: string;
  due: Date;

  _links: Map<string, Href>[];
}
