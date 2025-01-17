import { inject } from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {TokenService} from "../../service/token.service";
import {AccountService} from "../../service/account.service";

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const accountService = inject(AccountService);
  const router = inject(Router);

  if (!tokenService.loggedIn()) {
    tokenService.removeToken();
    accountService.changeStatus(false)
    router.navigateByUrl('login')
    return false;
  } else {
    return true;
  }
};
