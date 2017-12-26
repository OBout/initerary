import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { ModalController, NavParams } from 'ionic-angular';
import { NewContact } from './modals/newContact';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  contacts: FirebaseListObservable<any[]>;

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

    this.contacts = this
      .db
      .list('/Contacts');
  }

  linkText(contact: any): string {
    let retval = '';

    switch (contact.Type) {
      case 'whatsapp':
        // https://chat.whatsapp.com/invite/8Gl9Gtt4PdI2J654IFkqfB

        if (contact.Val.indexOf('https') !== -1) {
          retval = contact.Val;
        } else {
          retval = 'https://api.whatsapp.com/send?phone=' + contact.Val;
        }

        break;
      case 'tel':
        retval = 'tel:' + contact.Val;
        break;
      case 'email':
        retval = 'mailto:' + contact.Val;
        break;
      case 'www':
        retval = contact.Val;
        break;
    }

    return retval;
  }

  contactIcon(type: string): string {

    let retval = '';

    switch (type) {
      case 'whatsapp':
        retval = 'logo-whatsapp';
        break;
      case 'tel':
        retval = 'phone-portrait';
        break;
      case 'email':
        retval = 'mail'
        break;
      case 'www':
        retval = 'globe';
        break;
    }

    return retval;
  }

  new() {

    let dater = new Date();
    let contactModal = this.modalCtrl.create(NewContact, {});
    contactModal.onDidDismiss(data => {
      console.log('dismissed data', data);

      if (data) {
        let yesR = confirm('Wilt u een nieuw contact maken met name ' + data.Name + '?')
        if (yesR === true) {
          this.contacts.push(data);
          console.log('new');
          alert('opgeslagen');
        } else {
          console.log('cancelled');
        }
      }
    });
    contactModal.present();
  }
}
