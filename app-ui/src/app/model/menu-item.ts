
export class MenuItem {

  public id: string;
  public value: string;
  public cssClasses: string;
  public route: string;

  constructor(id: string, value: string, cssClasses: string, route: string) {

    this.id = id;
    this.value = value;
    this.cssClasses = cssClasses;
    this.route = route;
  }
}
