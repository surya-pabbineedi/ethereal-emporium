import { HttpInterceptorFn } from '@angular/common/http';

export const AuthenticationBearerInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('user_access_token');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
