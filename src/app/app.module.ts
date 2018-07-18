import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SensorPageModule } from '../pages/sensor/sensor.module';
import { firebaseConfig } from './firebase-config';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { PipesModule } from '../pipes/pipes.module';
import { LoginPageModule } from '../pages/login/login.module';
import { AngularFireAuthModule } from '../../node_modules/angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import { ChartPageModule } from '../pages/chart/chart.module';
import { SensorDataProvider } from '../providers/sensor-data/sensor-data';

@NgModule({
  declarations: [MyApp, HomePage, ListPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    PipesModule,
    SensorPageModule,
    LoginPageModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ChartPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, ListPage],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SensorDataProvider
  ]
})
export class AppModule {}
