import {CanActivateFn, Router} from '@angular/router';
import {TokenService} from "../../service/token.service";
import {inject} from "@angular/core";

export const roleUserGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.loggedIn()) {
    const roles = tokenService.getRoles();

    if (roles.includes('ROLE_USER')) {
      return true;
    } else {
      window.history.back();
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};
