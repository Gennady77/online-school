import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AppComponent
      ],
    });

    component = TestBed.inject(AppComponent);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
