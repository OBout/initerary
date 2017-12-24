import { Component } from '@angular/core';
import { ModalController, ViewController, NavParams } from 'ionic-angular';

@Component({ selector: 'modal-newDay', templateUrl: 'newDay.html' })

export class NewDay {

    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    iscorrect: boolean = false;
    returndata: {};

    constructor(public viewCtrl: ViewController, params: NavParams) {

        this.year = params.get('year');
        this.month = params.get('month');
        this.day = params.get('day');
        this.hour = params.get('hour');
        this.minute = params.get('minute');

    }

    correct(){
        this.returndata = { 'year': this.year, 'month': this.month, 'day': this.day, 'hour': this.hour, 'minute': this.minute };
        this.dismiss();
    }

    dismiss() {
        let data = this.returndata;
        this.viewCtrl.dismiss(data);
    }

}