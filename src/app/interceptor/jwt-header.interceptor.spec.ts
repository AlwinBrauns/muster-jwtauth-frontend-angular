import { TestBed } from '@angular/core/testing';

import { JwtHeaderInterceptor } from './jwt-header.interceptor';

describe('JwtHeaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtHeaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JwtHeaderInterceptor = TestBed.inject(JwtHeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
