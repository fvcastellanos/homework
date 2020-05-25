import {Href} from "../../model/href";

export class Assignment {

  public id: number;
  public name: string;
  public description: string;
  public email: string;
  public copyEmail: string;

  public _links: Map<string, Href>[]
}
