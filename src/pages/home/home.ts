import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth) {}

  public openLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
