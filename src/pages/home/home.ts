import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {ModalContentPage} from "./new/add.new.component";
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {WordsPage} from "../words/words";
import {AngularFireAuth} from "angularfire2/auth";
import {AuthPage} from "../auth/auth";
import {AuthService} from "../../providers/auth-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any[]>;
  userId;
  subscription;

  constructor(
    public modalCtrl: ModalController,
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public authService: AuthService
  ) {

  }

  ionViewDidLoad() {
    this.subscription = this.afAuth.authState.subscribe((user) =>{
      if(user && user.uid){
        this.userId = this.authService.userID;
        this.init();
      }else{
        this.subscription.unsubscribe();
        this.navCtrl.setRoot(AuthPage, { }, {animate: true, direction: 'forward'});
      }
    });
  }

  init() {
    this.items = this.db.list('/categories/' + this.userId);
  }

  openDialog(category) {
    let modal = this.modalCtrl.create(ModalContentPage, {category: category});
    modal.present();

    modal.onDidDismiss(res => {
      let mode = res.mode;
      let data = res.data;

      if (mode === 'delete') {
        this.items.remove(data.$key);
      } else if (mode === 'create') {
        data && this.items.push({value: data.value});
      } else if (mode === 'update') {
        this.items.update(data.$key, {value: data.value});
      }
    });
  }

  goToWords(item) {
    this.navCtrl.push(WordsPage, {
      'categoryId': item.$key
    });
  }

  logout(){
    this.authService.signOut();

   // this.navCtrl.setRoot(AuthPage, { }, {animate: true, direction: 'forward'});
   // this.authService.signOut();
   /*   .then(res =>{
        this.navCtrl.setRoot(AuthPage, { }, {animate: true, direction: 'forward'});
      });*/
  }
}
