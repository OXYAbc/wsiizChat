import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LoginService } from '../login/login.service';

import { AuthGuard } from './auth.guard';
@Injectable()
class LoginServiceMock{

}

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: LoginService, useClass:LoginServiceMock}]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
