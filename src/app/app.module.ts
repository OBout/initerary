import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { EditPage } from '../pages/edit/edit';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../directives/login/login';
import { NewDay } from '../pages/edit/modals/newDay';
import { NewContact } from '../pages/contact/modals/newContact';
import { ViewDay } from '../pages/home/modals/view';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'

export const firebaseConfig = {
  apiKey: "AIzaSyDEQObnRPUgSmUO8jAunBvNxhg7Vue-Gpg",
  authDomain: "itinerary-oscoweb.firebaseapp.com",
  databaseURL: "https://itinerary-oscoweb.firebaseio.com",
  projectId: "itinerary-oscoweb",
  storageBucket: "itinerary-oscoweb.appspot.com",
  messagingSenderId: "231837315466"
};

@NgModule({
  declarations: [
    MyApp,
    EditPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    NewDay,
    NewContact,
    ViewDay
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    CustomFormsModule,
    HttpModule,
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    NewDay,
    NewContact,
    ViewDay
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireAuth,
    AngularFireDatabase,
  ]
})
export class AppModule { }
