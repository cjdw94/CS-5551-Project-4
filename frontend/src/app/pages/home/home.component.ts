import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private  Auth: AuthService, private router: Router, private firebase: AngularFireAuth) {
  }

  Username = '';
  Password = '';
  // FirstName = '';
  // LastName = '';
  signIn = '1';
  register;
  ngOnInit() {
  }

  LogIn(e) {
    if (this.Username !== '' && this.Password !== '') {
      this.Auth.login(this.Username, this.Password);
      this.Auth.LoggedIn(true);
    } else {alert('Please Enter a valid account.'); }
  }

  SignUp(e) {
    if (this.Username !== '' && this.Password !== '') {
      this.Auth.signup(this.Username, this.Password);
      this.Auth.LoggedIn(true);
    } else {alert('Please Enter a valid information.'); }
  }
  Cancel() {
    this.signIn = '1';
    this.register = '';
  }
  Register() {
    this.signIn = '';
    this.register = '1';
  }
}
