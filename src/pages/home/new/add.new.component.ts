import {NavParams, ViewController} from "ionic-angular";
import {Component} from "@angular/core";

@Component({
  selector: 'add-new',
  templateUrl: 'add.new.tpl.html'
})
export class ModalContentPage {
  category;
  mode;

  constructor(public viewCtrl: ViewController,
              params: NavParams) {

    let data = params.get('category') ? params.get('category') : {};

    this.mode = data.$key ? 'update': 'create';
    this.category = {...data};
    this.category.$key = data.$key;
  }

  dismiss() {
    this.viewCtrl.dismiss({data: this.category, mode: this.mode});
  }

  cancel() {
    this.viewCtrl.dismiss({});
  }

  deleteItem(){
    this.mode = 'delete';
    this.viewCtrl.dismiss({data: this.category, mode: this.mode});
  }
}
