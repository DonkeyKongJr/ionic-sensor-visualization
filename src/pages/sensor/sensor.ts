import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { FireSensorData } from '../../entities/fire-sensor-data.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { SensorDataProvider } from '../../providers/sensor-data/sensor-data';

/**
 * Generated class for the SensorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sensor',
  templateUrl: 'sensor.html'
})
export class SensorPage {
  public fireSensorData: FireSensorData[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    private readonly db: AngularFirestore,
    private readonly sensorDataProvider: SensorDataProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SensorPage');
    this.loadData();
  }

  ionViewCanEnter(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth.user.subscribe(_ => {
        if (_) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  private loadData() {
    this.db
      .collection('sensordata', ref =>
        ref.orderBy('timestamp', 'desc').limit(960)
      )
      .valueChanges()
      .subscribe((data: FireSensorData[]) => {
        this.fireSensorData = this.sensorDataProvider.convertTimestamp(data);
      });
  }
}
