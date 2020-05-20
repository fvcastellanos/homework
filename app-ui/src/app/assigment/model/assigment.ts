import {Href} from "../../model/href";

export class Assigment {

  public id: number;
  public name: string;
  public email: string;
  public copyEmail: string;

  public _links: Map<string, Href>[]

}
