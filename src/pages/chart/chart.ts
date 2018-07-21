import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { FireSensorData } from '../../entities/fire-sensor-data.model';
import { SensorDataProvider } from '../../providers/sensor-data/sensor-data';

/**
 * Generated class for the ChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class ChartPage {
  @ViewChild('temperatureCanvas') temperatureCanvas;
  @ViewChild('humidityCanvas') humidityCanvas;
  temperatureLineChart: any;
  humidotyLineChart: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    private readonly db: AngularFirestore,
    private readonly sensorDataProvider: SensorDataProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartPage');
    this.initializeTemperatureLineChart();
    this.initializeHumidityLineChart();
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
      .collection('sensordata', ref => ref.orderBy('timestamp', 'asc'))
      .valueChanges()
      .subscribe((data: FireSensorData[]) => {
        this.addDataToChart(this.sensorDataProvider.convertTimestamp(data));
      });
  }

  private addDataToChart(fireSensorData: FireSensorData[]) {
    let dates: string[] = [];
    fireSensorData.forEach(data => {
      dates.push((data.timestamp as Date).toLocaleDateString());
      this.temperatureLineChart.config.data.datasets[0].data.push(
        data.temperature
      );
      this.humidotyLineChart.config.data.datasets[0].data.push(data.humidity);
    });

    this.temperatureLineChart.config.data.labels = dates;
    this.humidotyLineChart.config.data.labels = dates;

    this.temperatureLineChart.update();
    this.humidotyLineChart.update();
  }

  private initializeTemperatureLineChart() {
    this.temperatureLineChart = new Chart(
      this.temperatureCanvas.nativeElement,
      {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'Temperature',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              spanGaps: false
            }
          ]
        }
      }
    );
  }

  private initializeHumidityLineChart() {
    this.humidotyLineChart = new Chart(this.humidityCanvas.nativeElement, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Humidity',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            spanGaps: false
          }
        ]
      }
    });
  }
}
