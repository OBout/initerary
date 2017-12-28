import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ModalController } from 'ionic-angular';
import { NewDay } from './modals/newDay';
import { AlertController } from 'ionic-angular';

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

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, private db: AngularFireDatabase, public modalCtrl: ModalController) {
    // Initialize Firebase

    this.days = this
      .db
      .list('/Itinerary');
  }

  delete(day: any): void {
    console.log('delete', day);
    let alert = this.alertCtrl.create({
      title: 'Remove day',
      message: 'Wilt u dag "' + day.Date + '" verwijderen?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('delete abortified');
          }
        },
        {
          text: 'Yes, Remove',
          handler: () => {
            this.removeItem(day);
          }
        }
      ]
    });
    alert.present();
  }

  removeItem(day) {
    this.days.remove(day);
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

    console.log('edit', day);
    let alert = this.alertCtrl.create({
      title: 'Edit day',
      message: 'Weet je zeker dat je dit onderdeel "' + day.Date + '" wilt wijzigen?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('editting abortified');
          }
        },
        {
          text: 'Yes, Edit',
          handler: () => {
            this.edit_day = day;
            this.selectDay(i);
            console.log('editting', day);
          }
        }
      ]
    });
    alert.present();

  }

  save() {

    let alert = this.alertCtrl.create({
      title: 'Save day',
      message: 'Weet je zeker dat je dit onderdeel "' + this.edit_day.Date + '" wilt wijzigen?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('editting abortified');
          }
        },
        {
          text: 'Yes, Save',
          handler: () => {
            try {
              this
                .db
                .object('/Itinerary/' + this.edit_day.$key)
                .set(this.edit_day)
                .then(() => {
                  console.log('saving successfull');
                  this.cancel();
                })
                .catch((error) => {
                  console.log('An error while saving:\n' + error);
                });
            } catch (e) {
              console.log('An error while saving, sorry:/n' + e);
            }
          }
        }
      ]
    });
    alert.present();

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

          let alert = this.alertCtrl.create({
            title: 'New day',
            message: 'Wilt u een nieuwe dag maken met datum ' + newday.Date + ' om ' + newday.StartTime + ' uur?',
            buttons: [
              {
                text: 'No',
                role: 'cancel',
                handler: () => {
                  console.log('new day abortified');
                }
              },
              {
                text: 'Yes, Create',
                handler: () => {
                  this.days.push(newday);
                  console.log('new');
                }
              }
            ]
          });
          alert.present();

        }
      }
    });
    contactModal.present();
  }

}
