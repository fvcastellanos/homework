import {Href} from "../href";
import {Assignment} from "../assignment/assignment";

export class Homework {
  pk: number;
  name: string;
  description: string;
  assignment: Assignment;
  due: Date;

  _links: Map<string, Href>[];
}
