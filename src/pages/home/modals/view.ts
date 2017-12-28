import { Component, ElementRef, ViewChild } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

declare var google;

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

    @ViewChild('map') mapElement: ElementRef;

    map: any;
    mapInitialised: boolean = false;
    apiKey: any = 'AIzaSyBL571loQbR8r58UUT2f9prXyK5JvQGDnw';
    lat: number = 52;
    long = 4;

    // AIzaSyBL571loQbR8r58UUT2f9prXyK5JvQGDnw
    // maps api key

    constructor(
        /* force newline */
        public viewCtrl: ViewController,
        private params: NavParams,
        private http: Http,
    ) {
        let fetchDay = this.params.get('day');
        this.day = fetchDay;
        console.log('fetched day', fetchDay);
        this.daynumber = this.params.get('i');
        this.days = this.params.get('days');
        this.getLatLong();
    }

    getLatLong() {

        let query = this.day.Destination;
        if (query) {
            console.log('dest', this.day.Destination);
        } else {
            query = this.day.Departure;
        }
        console.log('query', query);


        let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + query + '&key=' + this.apiKey;
        let latlonggetter = this.http.get(url);
        latlonggetter.subscribe((mapsrespone: any) => {
            let res = mapsrespone.json();
            console.log('mapsrespone', res);

            this.lat = res.results[0].geometry.location.lat;
            this.long = res.results[0].geometry.location.lng;

            console.log('lat', this.lat);
            console.log('long', this.long);

            this.loadGoogleMaps();

        });
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
        this.getLatLong();
    }

    loadGoogleMaps() {

        console.log("online, loading map");

        //Load the SDK
        window['mapInit'] = () => {
            this.initMap();
            this.enableMap();
        }

        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }

        document.body.appendChild(script);

    }
    initMap() {

        this.mapInitialised = true;
        let latLng = new google.maps.LatLng(this.lat, this.long);

        let mapOptions = {
            center: latLng,
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }

    disableMap() {
        console.log("disable map");
    }

    enableMap() {
        console.log("enable map");
    }

    addConnectivityListeners() {

        let onOnline = () => {

            setTimeout(() => {
                if (typeof google == "undefined" || typeof google.maps == "undefined") {

                    this.loadGoogleMaps();

                } else {

                    if (!this.mapInitialised) {
                        this.initMap();
                    }

                    this.enableMap();
                }
            }, 2000);

        };

        let onOffline = () => {
            this.disableMap();
        };

        document.addEventListener('online', onOnline, false);
        document.addEventListener('offline', onOffline, false);

    }

}