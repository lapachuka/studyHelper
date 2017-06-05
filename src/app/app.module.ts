import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ModalContentPage} from "../pages/home/new/add.new.component";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {WordsPage} from "../pages/words/words";
import {WordModalContent} from "../pages/words/new/add.new.component";
import {ProcessPage} from "../pages/process/process";
import { AuthService } from '../providers/auth-service';
import {AuthPageModule} from "../pages/auth/auth.module";

export const firebaseConfig = {
  apiKey: "AIzaSyCYMlMc5AqiCWLDC0ASkBI9kXRThr2w9Pk",
  authDomain: "reference-smile-86912.firebaseapp.com",
  databaseURL: "https://reference-smile-86912.firebaseio.com",
  projectId: "reference-smile-86912",
  storageBucket: "reference-smile-86912.appspot.com",
  messagingSenderId: "661520275753"
};

@NgModule({
  declarations: [
    MyApp,
    ModalContentPage,
    HomePage,
    WordsPage,
    ProcessPage,
    WordModalContent,
    TabsPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
    AuthPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ModalContentPage,
    WordsPage,
    HomePage,
    WordModalContent,
    ProcessPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
