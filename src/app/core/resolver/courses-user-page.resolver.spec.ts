import { TestBed } from '@angular/core/testing';

import { CoursesUserPageResolver } from './courses-user-page.resolver';

describe('CoursesUserPageResolver', () => {
  let resolver: CoursesUserPageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CoursesUserPageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
