import {Href} from "../../model/href";

export class Assignment {

  public id: string;
  public name: string;
  public description: string;
  public email: string;
  public copyEmail: string;

  public _links: Map<string, Href>[]

}
