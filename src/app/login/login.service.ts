import { Injectable } from '@angular/core';
import { GoogleAuthProvider, updateProfile, User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {UsersService} from "../auth/user-service";

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  isLoggedIn = false;
  private userData = new BehaviorSubject<User | any>(null);
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private userService: UsersService,
  ) {
    if (sessionStorage.getItem('user') !== null) {
      this.isLoggedIn = true;
      this.router.navigate(['chatbot']);
    } else this.isLoggedIn = false;

    this.fireauth.authState.subscribe((user) => {
      if (user) {
        this.userData.next(user);
        sessionStorage.setItem(
          'userDetails',
          JSON.stringify(this.userData.value)
        );
        JSON.parse(sessionStorage.getItem('userDetails')!);
      } else {
        sessionStorage.setItem('userDetails', 'null');
        JSON.parse(sessionStorage.getItem('userDetails')!);
      }
    });
  }

  login(email: string, password: string) {
    this.fireauth
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        sessionStorage.setItem('user', JSON.stringify(res.user));
        this.isLoggedIn = true;
        this.router.navigateByUrl('/chatbot');
      })
      .catch((error) => {
        alert(error.message);
        this.router.navigate(['/login']);
      });
  }
  register(email: string, password: string) {
    this.fireauth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.userService.createUser(res);
        alert('Sucsessful !');
        this.router.navigate(['login']);
      })
      .catch((error) => {
        alert(error.message);
        this.router.navigate(['/login']);
      });
  }
  logout() {
    this.fireauth.signOut().then(
      () => {
        sessionStorage.removeItem('user');
        this.isLoggedIn = false;
        this.router.navigate(['/auth/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['auth/login']);
      },
      (error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      }
    );
  }
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(
      (res) => {
        sessionStorage.setItem('user', JSON.stringify(res.user));
        this.isLoggedIn = true;
        this.userService.getUser(res.user?.uid as string).subscribe((result: any)=>{
          if(result == undefined) this.userService.createUser(res);
        })
        this.router.navigateByUrl('/chatbot');
      },
      (err) => {
        alert(err.message);
      }
    );
  }
  isAuthenticated() {
    return this.isLoggedIn;
  }
  getUser():Observable<User | any> {
    return this.userData
  }
  setDetails(user: any) {
    return updateProfile(this.userData.value, user)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  }
}
