import {NavParams, ViewController} from "ionic-angular";
import {Component} from "@angular/core";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database";

@Component({
  selector: 'add-new',
  templateUrl: 'add.new.tpl.html'
})
export class ModalContentPage {
  category;
  mode;
  item: FirebaseObjectObservable<any[]>;

  constructor(public viewCtrl: ViewController,
              params: NavParams,
              public db: AngularFireDatabase) {
    let categoryParam = params.get('category') ? params.get('category') : '';

    if (categoryParam.$key) {
      this.mode = 'edit';
      this.category = this.db.object('categories/' + categoryParam.$key);
      this.category.value = categoryParam.value;
    } else {
      this.mode = 'create';
      this.category = {value: ''};
    }

  }

  deleteItem() {
    this.category.remove();
    this.viewCtrl.dismiss();
  }

  dismiss() {
    if(this.mode === 'edit'){
      this.category.update({value: this.category.value});
    }
    this.viewCtrl.dismiss(this.category);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
