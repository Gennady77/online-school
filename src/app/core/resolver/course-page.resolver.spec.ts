import { TestBed } from '@angular/core/testing';

import { MainPageResolver } from './course-page.resolver';
import { apiServiceMockGetSubject, apiServiceMockProvider } from "../../../test-helpers/providers";
import { ApiService } from "../service/api.service";

describe('MainPageResolver', () => {
  let resolver: MainPageResolver;
  let apiServiceMock: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [apiServiceMockProvider]
    });
    resolver = TestBed.inject(MainPageResolver);
    apiServiceMock = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  describe('resolve', () => {
    it('should call get method of ApiService', () => {
      resolver.resolve({} as any);

      expect(apiServiceMock.get).toHaveBeenCalledWith('/allcourses');
    });

    it('should resolve data', () => {
      const spy = jasmine.createSpy();

      resolver.resolve({} as any).subscribe(spy);

      apiServiceMockGetSubject.next('mock data');

      expect(spy).toHaveBeenCalledWith('mock data');
    });

    it('should catch error', () => {
      const spy = jasmine.createSpy();

      resolver.resolve({} as any).subscribe(spy);

      apiServiceMockGetSubject.error('mock data');

      expect(spy).toHaveBeenCalledWith([]);
    });
  });
});
