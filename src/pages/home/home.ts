import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuthModule, AngularFireAuth} from 'angularfire2/auth';

@Component({selector: 'page-home', templateUrl: 'home.html'})

export class HomePage {

  days : FirebaseListObservable < any[] >;
  select_day : number = -1;

  constructor(public navCtrl : NavController, private db : AngularFireDatabase) {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDEQObnRPUgSmUO8jAunBvNxhg7Vue-Gpg",
      authDomain: "itinerary-oscoweb.firebaseapp.com",
      databaseURL: "https://itinerary-oscoweb.firebaseio.com",
      projectId: "itinerary-oscoweb",
      storageBucket: "itinerary-oscoweb.appspot.com",
      messagingSenderId: "231837315466"
    };

    this.days = this
      .db
      .list('/Itinerary');
    this
      .days
      .subscribe((response) => {
        console.log('response', response);
      }, (error) => {
        console.log('error', error);
      });
  }

  selectDay(i : number) {
    this.select_day = i;
  }

  daySelected() : number {return this.select_day;}

}
