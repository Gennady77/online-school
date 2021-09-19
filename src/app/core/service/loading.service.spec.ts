import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

fdescribe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setLoading', () => {
    it('should set loading flag', () => {
      const spy = jasmine.createSpy();

      service.isLoading$.subscribe(spy);

      service.setLoading(true);

      expect(spy).toHaveBeenCalledWith(true);
    });
  });
});
