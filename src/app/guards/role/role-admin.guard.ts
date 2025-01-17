import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { TokenService } from "../../service/token.service";

export const roleAdminGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.loggedIn()) {
    const roles = tokenService.getRoles();

    if (roles.includes('ROLE_ADMIN')) {
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

