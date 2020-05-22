import {Embedded} from "./embedded";
import {Href} from "../../model/href";

export class Response {

  public _embedded: Embedded;
  public _links: Map<string, Href>[];
}
