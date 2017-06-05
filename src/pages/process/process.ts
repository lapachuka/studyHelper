import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

@Component({
  selector: 'page-process',
  templateUrl: 'process.html',
})
export class ProcessPage {

  wordList: FirebaseListObservable<any[]>;
  currentQuestion;
  currentIndex;
  questions;
  isBackWordShowed = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    let id = navParams.get('categoryId');

    this.db.list('/words/' + id)
      .subscribe(result => {
        this.questions = result;
        this.currentIndex = 0;
        this.currentQuestion = this.questions[this.currentIndex];
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcessPage');
  }

  showBackWord(){
    this.isBackWordShowed = true;
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.currentQuestion = this.questions[this.currentIndex];
    this.isBackWordShowed = false;
  }

}
