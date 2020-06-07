import {Href} from "../href";

export class Assignment {

  public pk: number;
  public name: string;
  public description: string;
  public email: string;
  public copyEmail: string;

  public _links: Map<string, Href>[];
}
