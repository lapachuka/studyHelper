import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from "../../providers/auth-service";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  authPage;
  mode = 'Login';
  errors;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public authService: AuthService) {

  }

  ionViewDidLoad() {
    this.checkLogin();
  }

  switchForm(formType){
    this.errors = '';
    if(formType === 'login'){
      this.mode = 'Login';
    }else{
      this.mode = 'Registration';
    }
  }


  login(form) {
    this.authService.signIn(form.value.email, form.value.password)
      .then(response => {
        this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
      }, err => {
        this.errors = err;
      })
  }

  checkLogin() {
    if (this.authService.authenticated) {
      this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
    }
  }

  signUp(form) {
    if (form.value.password === form.value.rePassword && form.value.email) {
      this.authService.signUp(form.value.email, form.value.password)
        .then(resp => {
          this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
        }, err => {
          this.errors = err;
        });
    }
  }


}
