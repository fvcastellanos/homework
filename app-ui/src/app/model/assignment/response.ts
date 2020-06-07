import {Embedded} from "./embedded";
import {Href} from "../href";

export class Response {

  public _embedded: Embedded;
  public _links: Map<string, Href>[];
}
