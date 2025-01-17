import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../../service/token.service";

export const afterAuthGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.loggedIn()) {
    window.history.back();
    return false;
  } else {
    return true;
  }
};
