import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_CONFIG} from "../../api-config";
import {AccountService} from "./account.service";
import {TokenService} from "./token.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root', // Ensures service is globally available
})
export class LoginService {
  private apiUrl = `${API_CONFIG.BASE_URL}/account/login`;
  private registerUrl = `${API_CONFIG.BASE_URL}/account/register`;


  constructor(private http: HttpClient ,  private tokenService: TokenService,
              private accountService: AccountService , private router: Router) { }


  login(data: { nomColombie: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  public handleResponse(data: any): void {
    this.tokenService.handle(data);
    console.log(data)
    this.accountService.changeStatus(true);
    if (data) {
      const roles = data.user.roles || [];
      let isAdmin = roles.some((role: any) => role.roleName === 'ROLE_ADMIN');
      let isOrganizer = roles.some((role: any) => role.roleName === 'ROLE_ORGANIZER');
      let isUser = roles.some((role: any) => role.roleName === 'ROLE_USER');
      if (isAdmin) {
        this.router.navigate(['/admin/dashboard']);
        console.log("admin")
      } else if(isOrganizer) {
        this.router.navigate(['/organizer/dashboard']);
        console.log("organizer")
      } else if(isUser){
        this.router.navigate(['/user']);
        console.log("user")
      }
    }
  }

  register(formData: {
    nomColombie: string;
    password: string;
    username: string;
    latitude: number;
    longitude: number;
  }): Observable<any> {
    return this.http.post(this.registerUrl, formData);
  }
}
