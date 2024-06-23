import { DialogModule, DialogRef } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ForgotPassModule } from './forgot-password/forgot-password.module';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
@Injectable()
class LoginServiceMock {
  login(first: string, second: string) {}
  googleSignIn() {}
  register(first: string, second: string) {}
  forgotPassword(first: string) {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: LoginService;
  let afAuth: AngularFireAuth;
  let isAuthRef: boolean;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, DialogModule, ForgotPassModule],
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useClass: LoginServiceMock },
        {
          provide: DialogRef,
          useValue: {
            close: (dialogResult: any) => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    service = TestBed.inject(LoginService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call to forgotPassword', fakeAsync(() => {
    const spyOnService = spyOn(service, 'forgotPassword');
    const openDialogbutton = fixture.nativeElement.querySelector('a');
    openDialogbutton.click();
    const dialogModal = document.querySelector('app-forgot-password');
    const button = dialogModal?.querySelector('button') as HTMLButtonElement;
    const input = dialogModal?.querySelector('input') as HTMLInputElement;
    input.value = 'mail@mail.com';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    button.click();
    tick(200);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(spyOnService).toHaveBeenCalled();
    });
  }));

  it('should call to onSubmitLogin service', fakeAsync(() => {
    const spyOnService = spyOn(service, 'login');
    const loginBox = fixture.nativeElement.querySelector(
      'app-card[title="login"]'
    );
    const button = loginBox.querySelector('button');
    const inputEmail = loginBox.querySelector('input[name="email"]');
    const inputPass = loginBox.querySelector('input[name="password"]');
    inputEmail.value = 'login@wsiizChat.pl';
    inputEmail.dispatchEvent(new Event('input'));
    inputPass.value = 'hasloijaslo';
    inputPass.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    button.click();
    tick(200);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(spyOnService).toHaveBeenCalled();
    });
  }));
  it('should call to onSubmitLogin method', fakeAsync(() => {
    const spyOnMethod = spyOn(component, 'onSubmitLogin');
    const loginBox = fixture.nativeElement.querySelector(
      'app-card[title="login"]'
    );
    const button = loginBox.querySelector('button');
    const inputEmail = loginBox.querySelector('input[name="email"]');
    const inputPass = loginBox.querySelector('input[name="password"]');
    inputEmail.value = 'login@wsiizChat.pl';
    inputEmail.dispatchEvent(new Event('input'));
    inputPass.value = 'hasloijaslo';
    inputPass.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    button.click();
    fixture.detectChanges();
    expect(spyOnMethod).toHaveBeenCalled();
  }));
  it('should call to onSubmitRegister service', fakeAsync(() => {
    const spyOnService = spyOn(service, 'register');
    const registerBox = fixture.nativeElement.querySelector(
      'app-card[title="Register"]'
    );
    const button = registerBox.querySelector('button');
    const inputEmail = registerBox.querySelector('input[name="emailSingUp"]');
    const inputPass = registerBox.querySelector('input[name="passwordSingUp"]');
    inputEmail.value = 'login@wsiizChat.pl';
    inputEmail.dispatchEvent(new Event('input'));
    inputPass.value = 'hasloijaslo';
    inputPass.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    button.click();
    tick(100);
    expect(spyOnService).toHaveBeenCalled();
  }));
  it('should call to onSubmitRegister method', fakeAsync(() => {
    const spyOnMethod = spyOn(component, 'onSubmitRegister');
    const registerBox = fixture.nativeElement.querySelector(
      'app-card[title="Register"]'
    );
    const button = registerBox.querySelector('button');
    const inputEmail = registerBox.querySelector('input[name="emailSingUp"]');
    const inputPass = registerBox.querySelector('input[name="passwordSingUp"]');
    inputEmail.value = 'login@wsiizChat.pl';
    inputEmail.dispatchEvent(new Event('input'));
    inputPass.value = 'hasloijaslo';
    inputPass.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    button.click();
    tick(100);
    expect(spyOnMethod).toHaveBeenCalled();
  }));
  it('should call to signInWithGoogle service', fakeAsync(() => {
    const spyOnService = spyOn(service, 'googleSignIn');
    const loginBox = fixture.nativeElement.querySelectorAll('app-card')[1];
    const button = loginBox.querySelector('button');
    button.click();
    tick(100);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(spyOnService).toHaveBeenCalled();
    });
  }));
});
