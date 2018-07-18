import { Injectable } from '@angular/core';
import { FireSensorData } from '../../entities/fire-sensor-data.model';

/*
  Generated class for the SensorDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SensorDataProvider {
  constructor() {}

  public convertTimestamp(sensordata: FireSensorData[]): FireSensorData[] {
    sensordata.forEach(_ => {
      _.timestamp = _.timestamp.toDate();
    });

    return sensordata;
  }
}
