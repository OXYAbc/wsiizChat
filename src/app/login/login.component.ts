import {Dialog} from '@angular/cdk/dialog';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from './login.service';
import {LoginForm} from "../models/login.model";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  mode: string = 'login';
  isLoggedIn: boolean = false;
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  isLoading: boolean = false;

  constructor(private loginService: LoginService,
              private dialog: Dialog,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.route.title.subscribe(title => {
      this.mode = title
    })
  }

  get isEmailInvalid(): boolean {
    return !!this.loginForm.get('email')?.invalid;
  }

  get isEmailTouchedOrDirty(): boolean {
    return !!(this.loginForm.get('email')?.dirty || this.loginForm.get('email')?.touched)
  }

  get errorRequired(): boolean {
    return !!this.loginForm.get('email')?.errors?.['required'];
  }

  get errorEmail(): boolean {
    return !!this.loginForm.get('email')?.errors?.['email'];
  }

  get isPasswordInvalid(): boolean {
    return !!this.loginForm.get('email')?.invalid;
  }

  get isPasswordTouchedOrDirty(): boolean {
    return !!(this.loginForm.get('email')?.dirty || this.loginForm.get('email')?.touched)
  }

  get errorPasswordRequired(): boolean {
    return !!this.loginForm.get('password')?.errors?.['required'];
  }

  get errorPasswordminlength(): boolean {
    return !!this.loginForm.get('password')?.errors?.['minlength'];
  }

  get negationOfMode(): string {
    return this.mode === 'register' ? 'login' : 'register'
  }

  get navButtonLabel(): string {
    return this.negationOfMode;
  }

  openDialog() {
    const dialogRef = this.dialog.open(ForgotPasswordComponent);
    dialogRef.closed.subscribe((result) => {
      if (result != undefined) {
        this.loginService.forgotPassword(result as string);
      }
    });
  }

  onSubmitLogin() {
    if (this.isLoading) return;
    this.isLoading = true;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.mode === 'login' ? this.loginService.login(email, password) :
      this.loginService.register(email, password)
    this.isLoading = false;
  }

  goToRegisterPage() {
    this.router.navigateByUrl(`/auth/${this.negationOfMode}`)
  }

  signInWithGoogle() {
    this.loginService.googleSignIn()
  }
}
