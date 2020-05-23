import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlHelperService {

  static getIdFromResource(url: string) : string {

    let index = url.lastIndexOf("/");
    return url.substr(index + 1);
  }
}
