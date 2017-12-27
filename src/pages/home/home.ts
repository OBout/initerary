import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ModalController } from 'ionic-angular';
import { ViewDay } from './modals/view';

@Component({ selector: 'page-home', templateUrl: 'home.html' })

export class HomePage {

  days: FirebaseListObservable<any[]>;
  localDays: any[];
  select_day: number = -1;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase, public modalCtrl: ModalController) {
    // Initialize Firebase

    this.days = this
      .db
      .list('/Itinerary');
    this
      .days
      .subscribe((response) => {
        console.log('response', response);
        this.localDays = response;
      }, (error) => {
        console.log('error', error);
      });
  }

  selectDay(day: any, i: number) {

    let viewDay = this.modalCtrl.create(ViewDay,
      { 'day': day, 'i': i, 'days': this.localDays }
    );

    viewDay.onDidDismiss(data => {
      console.log('view modal closed');
    });
    viewDay.present();
  }

}
