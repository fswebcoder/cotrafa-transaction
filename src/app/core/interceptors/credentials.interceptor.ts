import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@app/enviromments/environment';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  let token: string | null = null;
  try {
    token = sessionStorage.getItem('token');
  } catch {
    token = null;
  }
  const hasAuthHeader = req.headers.has('Authorization');
  const isApiRequest = req.url.startsWith(environment.services.apiUrl);
  const isAuthRequest = req.url.includes('/auth/login');

  const reqWithCredentials = req.clone({
    withCredentials: true,
    setHeaders: token && isApiRequest && !hasAuthHeader && !isAuthRequest ? { Authorization: `Bearer ${token}` } : {}
  });

  return next(reqWithCredentials);
};
