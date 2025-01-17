import {Injectable, OnInit} from '@angular/core';
import {API_CONFIG} from "../../api-config";
import {TokenService} from "./token.service";
import {Router} from "@angular/router";
import {Pigeon} from "../modal/pigeon";
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PigeonService {
  private apiUrl = `${API_CONFIG.BASE_URL}/Api/pigeons/`;

  constructor(private tokenService: TokenService, private router: Router  , private  http: HttpClient) { }


  getAllPigeons(is? : number): Observable<any> {
    let authId ;
    if (is){
      authId = is ;
    }else {
    authId = this.tokenService.getId();

    }
    return this.http.get(this.apiUrl+'Breeder/'+authId) ;
  }



  addPigeon(data: Pigeon): Observable<any> {
    const authId = this.tokenService.getUserId();
    if (!authId) {
      console.error("Auth ID is not initialized. Please log in.");
    }
    return this.http.post(`${this.apiUrl}${authId}`, data);
  }

}
