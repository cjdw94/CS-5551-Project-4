import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LoggedInStatus = false;
  public user$: Observable<firebase.User>;

  constructor(private router: Router, private afAuth: AngularFireAuth,
              private FirebaseDB: AngularFireDatabase) {
    this.user$ = this.afAuth.authState;
  }
  private value: boolean;
  login(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(_ => this.router.navigate(['DenseNet121']))
      .catch(error => console.log('auth error', error));
  }
  signup(email, password) {
    try {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(_ => {
          alert('Registration Successful');
          this.router.navigate(['DenseNet121']);
        }).catch(error => console.log('auth error', error));
    } catch (e) {
      console.error(e);
    }
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(_ => {
        this.LoggedIn(false);
        this.router.navigate(['/']);
      });
  }

  LoggedIn(value: boolean) {
    this.value = value;
    this.LoggedInStatus = this.value;
  }

  get isLoggedIn() {
    return this.LoggedInStatus;
  }
}
