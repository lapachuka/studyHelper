import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  private currentUser: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((user: firebase.User) =>{
      this.currentUser = user;
    } );
  }

  get authenticated(): boolean {
    console.log(this.currentUser);
    return !!this.currentUser;
  }

  signIn(email, password): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signUp(email, password){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  }


  signOut(){
    return this.afAuth.auth.signOut();
  }

  get userID(){
    return this.currentUser && this.currentUser.uid;
  }
}
