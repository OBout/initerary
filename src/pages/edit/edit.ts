import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuthModule, AngularFireAuth} from 'angularfire2/auth';

const default_day = {
  "Id": 0,
  "Activity": "",
  "Booking": "",
  "DateOrder": 0,
  "Date": "",
  "Departure": "",
  "Destination": "",
  "EndTime": "",
  "ExtraInfo": "",
  "StartTime": ""
};

@Component({selector: 'page-edit', templateUrl: 'edit.html'})
export class EditPage {

  days : FirebaseListObservable < any[] >;
  select_day : number = -1;
  edit_day : any = default_day;

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

  cancel() {
    this.select_day = -1;
    this.edit_day = default_day;
  }

  selectDay(i : number) {
    this.select_day = i;
  }

  daySelected() : any {return this.select_day;}

  edit(day : any, i : number) {

    let conf = confirm('Weet je zeker dat je dit onderdeel wilt wijzigen?');

    if (conf == true) {
      this.edit_day = day;
      this.selectDay(i);
      console.log('editting', day);
    } else {
      console.log('cancel editting', day);
    }

  }

  save() {
    let conf = confirm('Weet je zeker dat je dit onderdeel wilt wijzigen?');

    if (conf == true) {
      try {
        this
          .db
          .object('/Itinerary/' + this.edit_day.$key)
          .set(this.edit_day)
          .then(() => {
            console.log('saving successfull');
            alert('onderdeel opgeslagen');
          })
          .catch((error) => {
            alert('An error while saving:\n' + error);
          });
      } catch (e) {
        alert('An error while saving, sorry:/n' + e);
      }
    } else {
      console.log('edit cancelled');
      this.cancel();
    }

  }

  new() {
    console.log('new');
    alert('not yet possibe');
  }

}
