import {BaseComponent} from "./base-component";
import {ElementRef, ViewChild} from "@angular/core";

export abstract class BaseAddComponent extends BaseComponent {

  deleteId: number;
  deleteIndex: number;
  deleteName: string;

  @ViewChild("closeModal")
  closeModalButton: ElementRef;

  confirmDelete(name: string, id: number, index: number): void {

    console.log(`name: ${name}, id: ${id}`);
    this.cleanMessages();
    this.deleteName = name;
    this.deleteId = id;
    this.deleteIndex = index;
  }

  protected closeAddModal() {
    this.closeModalButton.nativeElement.click();
  }
}
