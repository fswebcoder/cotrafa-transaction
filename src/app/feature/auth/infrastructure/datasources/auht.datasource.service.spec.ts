import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { AuthDataSourceService } from './auht.datasource.service';
import { environment } from '@app/enviromments/environment';

describe('AuthDataSourceService', () => {
  let service: AuthDataSourceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthDataSourceService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(AuthDataSourceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should post login request to api', () => {
    const loginDto = { username: 'user', password: 'password123' };
    const mockResponse = { success: true, message: 'ok', data: { token: 't', user: { id: 1 } } };

    service.login(loginDto as any).subscribe((res) => {
      expect(res).toEqual(mockResponse as any);
    });

    const req = httpMock.expectOne(`${environment.services.apiUrl}auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginDto);
    req.flush(mockResponse);

    httpMock.verify();
  });
});

