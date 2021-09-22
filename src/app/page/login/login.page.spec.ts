import { TestBed } from '@angular/core/testing';

import { LoginPage } from './login.page';
import { authServiceLoginSubject, authServiceMockProvider, routerMockProvider } from "../../../test-helpers/providers";
import { AuthService } from "../../core/service/auth.service";
import { Router } from "@angular/router";

describe('LoginPage', () => {
  let component: LoginPage;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        LoginPage,
        authServiceMockProvider,
        routerMockProvider
      ]
    });

    component = TestBed.inject(LoginPage);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should call AuthService if form value is valid', () => {
      component.userEmail.setValue('aaa@aaa.aa');
      component.userPass.setValue('111');

      component.onSubmit();

      expect(authService.login).toHaveBeenCalledWith(component.formGroup.value);
    });

    it('should not call AuthService if form value is not valid', () => {
      component.onSubmit();

      expect(authService.login).not.toHaveBeenCalled();
    });

    it('should redirect to courses list if login is success', () => {
      component.userEmail.setValue('aaa@aaa.aa');
      component.userPass.setValue('111');

      component.onSubmit();

      authServiceLoginSubject.next({id: 'mockUserId'});

      expect(router.navigate).toHaveBeenCalledWith(['/courses/mockUserId']);
    })
  });
});
