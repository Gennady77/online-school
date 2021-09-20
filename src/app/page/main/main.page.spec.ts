import { TestBed } from '@angular/core/testing';

import { MainPage } from './main.page';
import { ActivatedRoute } from "@angular/router";

describe('MainPage', () => {
  let component: MainPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MainPage,
        {provide: ActivatedRoute, useValue: {
          snapshot: {
            data: {}
          }}
        }
      ]
    });

    component = TestBed.inject(MainPage);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
