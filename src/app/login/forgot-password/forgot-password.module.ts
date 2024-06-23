import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ForgotPasswordComponent } from "./forgot-password.component";

@NgModule({
    declarations: [ForgotPasswordComponent],
    imports: [FormsModule, CommonModule],
    providers: [],
    exports: [ForgotPasswordComponent],
  })
  export class ForgotPassModule {}
