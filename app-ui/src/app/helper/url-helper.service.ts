import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlHelperService {

  static getIdFromResource(url: string) : number {

    let index = url.lastIndexOf("/");

    return parseInt(url.substr(index+1));
  }
}
