import { TestBed } from '@angular/core/testing';

import { HttpMockInterceptor } from './http-mock.interceptor';

describe('HttpMockInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpMockInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpMockInterceptor = TestBed.inject(HttpMockInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
