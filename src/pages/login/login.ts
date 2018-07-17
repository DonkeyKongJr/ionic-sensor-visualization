import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  IonicModule
} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { firebaseConfig } from '../../app/firebase-config';
import * as firebase from 'firebase/app';
import { from } from 'rxjs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: Observable<firebase.User>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    private readonly gplus: GooglePlus,
    private readonly platform: Platform
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login() {
    if (this.platform.is('cordova')) {
      this.user = from(this.nativeGoogleLogin());
    } else {
      this.webGoogleLogin();
    }
  }
  public logout() {
    this.afAuth.auth.signOut();
  }

  async nativeGoogleLogin(): Promise<firebase.User> {
    try {
      const gplusUser = await this.gplus.login({
        webClientId: firebaseConfig.webClientId,
        offline: true,
        scopes: 'profile email'
      });

      console.log('idToken: ' + gplusUser.idToken);

      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      );
    } catch (err) {
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new auth.GoogleAuthProvider();
      await this.afAuth.auth.signInWithPopup(provider);
    } catch (err) {
      console.log(err);
    }
  }
}
