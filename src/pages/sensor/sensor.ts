import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { FireSensorData } from '../../entities/fire-sensor-data.model';
import { StringToNumberPipe } from '../../pipes/string-to-number/string-to-number';

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
    private readonly db: AngularFirestore
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SensorPage');
    this.loadData();
  }

  private loadData() {
    this.db
      .collection('sensordata', ref => ref.orderBy('timestamp', 'desc'))
      .valueChanges()
      .subscribe((data: FireSensorData[]) => {
        this.fireSensorData = this.convertTimestamp(data);
      });
  }

  private convertTimestamp(sensordata: FireSensorData[]): FireSensorData[] {
    sensordata.forEach(_ => {
      _.timestamp = _.timestamp.toDate();
    });

    return sensordata;
  }
}
