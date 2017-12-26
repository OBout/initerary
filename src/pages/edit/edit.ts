import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { ModalController, NavParams } from 'ionic-angular';
import { NewDay } from './modals/newDay';

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

@Component({ selector: 'page-edit', templateUrl: 'edit.html' })
export class EditPage {

  days: FirebaseListObservable<any[]>;
  select_day: number = -1;
  edit_day: any = default_day;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase, public modalCtrl: ModalController) {
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
    // this
    //   .days
    //   .subscribe((response) => {
    //     console.log('response', response);
    //   }, (error) => {
    //     console.log('error', error);
    //   });
  }

  cancel() {
    this.select_day = -1;
    this.edit_day = default_day;
  }

  selectDay(i: number) {
    this.select_day = i;
  }

  daySelected(): any { return this.select_day; }

  edit(day: any, i: number) {

    let conf = confirm('Weet je zeker dat je dit onderdeel "' + day.Date + '" wilt wijzigen?');

    if (conf == true) {
      this.edit_day = day;
      this.selectDay(i);
      console.log('editting', day);
    } else {
      console.log('cancel editting', day);
    }

  }

  save() {
    let conf = confirm('Weet je zeker dat je dit onderdeel "' + this.edit_day.Date + '" wilt wijzigen?');

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

    let dater = new Date();
    let contactModal = this.modalCtrl.create(NewDay,
      {
        year: dater.getFullYear(),
        month: dater.getMonth() + 1,
        day: dater.getDate(),
        hour: dater.getHours(),
        minute: dater.getMinutes()
      }
    );
    contactModal.onDidDismiss(data => {
      console.log('dismissed data', data);

      if (data) {
        if (data !== {}) {
          let newday = default_day;
          newday.Date = data.day + '-' + data.month + '-' + data.year;
          newday.StartTime = data.hour + ':' + data.minute;
          newday.DateOrder = parseFloat(('0000' + data.year).slice(-4) + ('00' + data.month).slice(-2) + ('00' + data.day).slice(-2) + ('00' + data.hour).slice(-2) + ('00' + data.minute).slice(-2));
          console.log('newday', newday);
          let yesR = confirm('Wilt u een nieuwe dag maken met datum ' + newday.Date + ' om ' + newday.StartTime + ' uur?')
          if (yesR === true) {
            this.days.push(newday);
            console.log('new');
            alert('opgeslagen');
          } else {
            console.log('cancelled');
          }
        }
      }
    });
    contactModal.present();
  }

}
