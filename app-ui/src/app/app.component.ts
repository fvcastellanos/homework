import { Component } from '@angular/core';
import {MenuItem} from "./model/menu-item";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-ui';

  menuOptions: MenuItem[] = [
    new MenuItem("li-assignments", "Assignments", "nav-item", "assignments"),
    new MenuItem("li-homework", "Homework", "nav-item", "homework")
  ];

  setMenuOptionActive(id: string) {

    this.menuOptions.forEach(item => {

      if (id == item.id) {
        item.cssClasses = 'nav-item active';
      } else {
        item.cssClasses = 'nav-item';
      }

    });


  }
}
