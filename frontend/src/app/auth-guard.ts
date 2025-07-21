import { CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateChildFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  return token ? true : router.parseUrl('/login');
};
