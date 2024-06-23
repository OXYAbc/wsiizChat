import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { LoginService } from './login/login.service';
import { LoginModule } from './login/login.module';
import { RouterModule } from '@angular/router';
import {AuthGuard} from "./auth/auth.guard";
import {AppRoutingModule} from "./app-routing.module";
import {DialogModule} from "@angular/cdk/dialog";
import {ChatBotComponent} from "./pages/organization/chat-bot.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, ChatBotComponent],
  imports: [
    BrowserModule,
    LoginModule,
    DialogModule,
    AppRoutingModule,
    AngularFireModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }, LoginService, AuthGuard],
  bootstrap: [AppComponent, ChatBotComponent],
  exports: [],
})
export class AppModule {}
