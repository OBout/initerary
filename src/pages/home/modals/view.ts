import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({ selector: 'modal-viewDay', templateUrl: 'view.html' })

export class ViewDay {

    private days: any;
    private daynumber: number;

    public day: any = {
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

    constructor(public viewCtrl: ViewController, private params: NavParams) {
        let fetchDay = this.params.get('day');
        this.day = fetchDay;
        console.log('fetched day', fetchDay);
        this.daynumber = this.params.get('i');
        this.days = this.params.get('days');
    }

    correct() {
        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    swipeEvent(e) {
        if (e.direction == 2) {
            this.go(1);
        } else {
            this.go(-1);
        }
    }

    go(i: number) {

        let maxnav = this.days.length - 1;
        let newDayNumber = this.daynumber + i;

        if (newDayNumber < 0 || newDayNumber > maxnav) {
            console.log('un navigatable');
            return;
        }

        this.day = this.days[newDayNumber];
        this.daynumber = newDayNumber;

    }

}