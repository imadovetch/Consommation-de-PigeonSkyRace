import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  private Roles : String[]  = [] ;
  constructor() { }

  set(data: any) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user_id', data.user.userID);
    localStorage.setItem('id', data.user.id);
  }

  handle(data: any) {
    this.set(data);
  }

  getRoles() {
    if (this.Roles.length === 0) {
      const token = this.getToken();
      if (token) {
        const payload = this.payload(token);
        this.Roles = payload.roles || [];
      }
    }
    return this.Roles;
  }


  getToken() {
    return localStorage.getItem('token');
  }

  getId() {
    return localStorage.getItem('id');
  }

  getUserId() {
    return localStorage.getItem('user_id');
  }

  removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('id');
    this.Roles = [] ;
  }

  decode(payload : any) {
    return JSON.parse(atob(payload));
  }

  payload(token: any) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  isValid() {
    const token = this.getToken();
    const userId = this.getUserId();

    if(token){
      const payload = this.payload(token);
      if(payload){
        return userId == payload.userID
      }
    }
    return false;
  }

  getInfo() {
    const token = this.getToken();
    if(token){
      const payload = this.payload(token);
      return payload ? payload : null;
    }
    return null;
  }

  loggedIn(){
    return this.isValid();
  }
}
