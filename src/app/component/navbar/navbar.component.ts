import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../service/account.service";
import {TokenService} from "../../service/token.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  currentUser: any;

  constructor(private accountService: AccountService , private tokenService: TokenService , private router: Router) {
  }

  ngOnInit(): void {
    this.accountService.authStatus.subscribe(authStatus => {
        this.currentUser = this.tokenService.getInfo();
      console.log(this.currentUser)
    })
  }

  logout() {
    this.tokenService.removeToken();
    this.accountService.changeStatus(false);
    this.router.navigate(['/login']);
  }
}
