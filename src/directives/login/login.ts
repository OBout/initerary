import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({ // use component instead of @diractive because we can use templateurl here
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private isAuthenticated: any;

  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(auth => {
      this.isAuthenticated = auth;
      console.log('this.isAuthenticated', this.isAuthenticated);
    });
    console.log('LoginPage constructed');
  }

  isLoggedIn() {
    if (this.isAuthenticated === null) {
      return false;
    }
    return true;
  }

  showUserPhotoIcon() {

    let img_org = 'assets/imgs/user.png';
    let img = img_org;

    try {
      img = this.afAuth.auth.currentUser.photoURL;
    } catch (e) {
      // console.log('photo went wrong', e);
      img = img_org;
    }
    return img;
  }

  log() {
    if (this.isLoggedIn() === false) {
      this.login();
    } else {
      this.logout();
    }
  }

  login() {

    let provider = new firebase.auth.GoogleAuthProvider();

    console.log('loggin in');

    this.afAuth.auth.signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      console.log('logged in with token', token);
      console.log('logged in with user', user);
    }).catch(function (error: any) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      console.log('error errorCode', errorCode);
      console.log('error errorMessage', errorMessage);
      console.log('error email', email);
      console.log('error credential', credential);
    });

  }

  showLogin() {
    console.log('isLoggedIn', this.isAuthenticated);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}

/* use after mentioned line to use this directive */
/* <page-login></page-login> */