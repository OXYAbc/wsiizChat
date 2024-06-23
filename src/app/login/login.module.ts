import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { ForgotPassModule } from './forgot-password/forgot-password.module';
import {UsersService} from "../auth/user-service";

@NgModule({
  declarations: [LoginComponent],
  imports: [ReactiveFormsModule, CommonModule, AngularFireModule, ForgotPassModule],
  providers: [LoginService, UsersService],
  exports: [LoginComponent],
})
export class LoginModule {}
