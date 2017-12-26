import { Component } from '@angular/core';
import { ModalController, ViewController, NavParams } from 'ionic-angular';

@Component({ selector: 'modal-newContact', templateUrl: 'newContact.html' })

export class NewContact {

    name: string ;
    type: string;
    info: string;
    val: string;

    returndata: {};
    constructor(public viewCtrl: ViewController, params: NavParams) {

    }

    correct() {
        this.returndata = {
            "Name": this.name?this.name:'',
            "Type": this.type?this.type:'',
            "Info": this.info?this.info:'',
            "Val": this.val?this.val:''
        }
        this.dismiss();
    }

    dismiss() {
        let data = this.returndata;
        this.viewCtrl.dismiss(data);
    }

}