import {Component} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {WordModalContent} from "./new/add.new.component";
import {HomePage} from "../home/home";
import {ProcessPage} from "../process/process";

/**
 * Generated class for the WordsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-words',
  templateUrl: 'words.html'
})
export class WordsPage {
  categoryId;
  wordList: FirebaseListObservable<any[]>;
  wordsCount: number;

  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public navParams: NavParams, public modalCtrl: ModalController) {
    this.categoryId = navParams.get('categoryId');

    if (!this.categoryId) {
      this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
    }
    this.wordList = this.db.list('/words/' + this.categoryId);
    this.db.list('/words/' + this.categoryId)
      .subscribe(resp => {
        this.wordsCount = resp.length;
      });
  }

  startLearning(word) {
    if (this.wordsCount) {
      this.navCtrl.push(ProcessPage, {
        'categoryId': this.categoryId
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WordsPage');
  }


  openDialog(word) {
    let modal = this.modalCtrl.create(WordModalContent, {word: word, categoryId: this.categoryId});
    modal.present();

    modal.onDidDismiss(res => {
      let mode = res.mode;
      let data = res.data;

      if (mode === 'delete') {
        this.wordList.remove(data.$key);
      } else if (mode === 'create') {
        data && this.wordList.push({front: data.front, back: data.back});
      } else if (mode === 'update') {
        this.wordList.update(data.$key, {front: data.front, back: data.back});
      }
    });
  }
}
