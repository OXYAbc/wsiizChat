import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { ChatBotComponent } from './pages/organization/chat-bot.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent, title: 'login' },
      { path: 'register', component: LoginComponent, title: 'register' },
    ],
  },
  {
    path: 'chatbot',
    component: ChatBotComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
