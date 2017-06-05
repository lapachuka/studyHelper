import {NavParams, ViewController} from "ionic-angular";
import {Component} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'add-new-word',
  templateUrl: 'add.new.tpl.html'
})
export class WordModalContent {
  word;
  mode;
  wordList;

  constructor(
    public viewCtrl: ViewController,
    public db: AngularFireDatabase,
          params: NavParams
  ) {

    let data = params.get('word') ? params.get('word') : {};
    let categoryId = params.get('categoryId') ? params.get('categoryId') : '';

    this.mode = data.$key ? 'update': 'create';
    this.word = data;

    this.wordList = this.db.list('/words/' + categoryId);
  }

  add(){
    this.wordList.push(this.word);
    this.word = {
      front: '',
      back: ''
    }
  }

  dismiss() {
    this.viewCtrl.dismiss({data: this.word, mode: this.mode});
  }

  cancel() {
    this.viewCtrl.dismiss({});
  }

  deleteItem(){
    this.mode = 'delete';
    this.viewCtrl.dismiss({data: this.word, mode: this.mode});
  }
}
