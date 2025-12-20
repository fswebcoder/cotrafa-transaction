import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { environment } from '@app/enviromments/environment';
import { HttpLoadingService } from '../services/http-loading.service';

function getRequestLabel(url: string, method: string): string {
  if (url.includes('/auth/login')) return 'Iniciando sesión...';
  if (url.includes('/accounts/user/') && url.includes('/transactions')) return 'Cargando historial...';
  if (url.includes('/accounts/user/')) return 'Cargando cuentas...';
  if (url.includes('/accounts/transfer')) return 'Procesando transferencia...';
  if (url.includes('/accounts/deposit')) return 'Procesando recarga...';
  if (url.includes('/users')) return 'Cargando usuarios...';
  if (method.toUpperCase() === 'GET') return 'Cargando...';
  return 'Procesando...';
}

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const isApiRequest = req.url.startsWith(environment.services.apiUrl);
  if (!isApiRequest) return next(req);

  const loadingService = inject(HttpLoadingService);
  const key = loadingService.start(getRequestLabel(req.url, req.method));

  return next(req).pipe(finalize(() => loadingService.stop(key)));
};

