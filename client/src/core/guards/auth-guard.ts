import { CanActivateFn } from '@angular/router';
import { AccountServiceService } from '../services/account-service.service';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = () => {
  const accountService = inject(AccountServiceService);
  const toast = inject(ToastService);

  if (accountService.currentUser()) return true;
  else {
    toast.error('You shall not pass');
    return false;
  }
};
