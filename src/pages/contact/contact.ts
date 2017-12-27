import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ModalController } from 'ionic-angular';
import { NewContact } from './modals/newContact';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  contacts: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase, public modalCtrl: ModalController) {

    this.contacts = this
      .db
      .list('/Contacts');
  }
  
  delete(contact: any): void {
    console.log('delete', contact);
    let removeR = confirm('Wilt u contact "' + contact.Name + '" verwijderen?');
    if (removeR === true) {
      this.contacts.remove(contact);      
    } else {
      console.log('delete abortified');
    }
  }
    
  linkText(contact: any): string {
    let retval = '';

    switch (contact.Type) {
      case 'whatsapp':

        let linkValue = contact.Val;
        linkValue.replace('+', '00');
        if (linkValue.indexOf('https') !== -1) {
          retval = linkValue;
        } else {
          retval = 'https://api.whatsapp.com/send?phone=' + linkValue;
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
