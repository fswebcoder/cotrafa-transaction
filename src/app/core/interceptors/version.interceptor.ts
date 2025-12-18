import { HttpInterceptorFn } from '@angular/common/http';

export const versionInterceptor: HttpInterceptorFn = (req, next) => {
    const clonedReq = req.clone({
        setHeaders: {
            'X-Frontend-Version': '1.0'
        }
    });
    return next(clonedReq);
};
