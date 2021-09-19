import { TestBed } from '@angular/core/testing';

import { SpinnerOverflowInterceptor } from './spinner-overflow.interceptor';

describe('SpinnerOverflowInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SpinnerOverflowInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SpinnerOverflowInterceptor = TestBed.inject(SpinnerOverflowInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
