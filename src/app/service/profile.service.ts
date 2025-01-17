import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:8443/account/profile';

  constructor(private http: HttpClient) { }


  getUser(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
