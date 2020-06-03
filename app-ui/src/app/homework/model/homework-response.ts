import {HomeworkEmbedded} from "./homework-embedded";
import {Href} from "../../model/href";

export class HomeworkResponse {

  _embedded: HomeworkEmbedded;
  _links: Map<string, Href>[];
}
