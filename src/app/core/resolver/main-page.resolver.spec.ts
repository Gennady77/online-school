import { TestBed } from '@angular/core/testing';

import { MainPageResolver } from './main-page.resolver';
import { apiServiceMockProvider } from "../../../test-helpers/providers";
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
      resolver.resolve({params: 'test params'} as any);

      expect(apiServiceMock.get).toHaveBeenCalledWith('/courses', 'test params');
    });
  });
});
