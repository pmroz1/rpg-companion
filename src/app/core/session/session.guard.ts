import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GameSessionService } from './game-session.service';

export const sessionGuard: CanActivateFn = () => {
  return inject(GameSessionService).session()
    ? true
    : inject(Router).createUrlTree(['/game-session/wrapper']);
};
