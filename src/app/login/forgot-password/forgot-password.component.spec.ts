import { DialogRef } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login.service';

import { ForgotPasswordComponent } from './forgot-password.component';
@Injectable()
class LoginServiceMock {}

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let service: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [FormsModule],
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

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    service = TestBed.inject(LoginService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
