import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SensorPage } from './sensor';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [SensorPage],
  imports: [IonicPageModule.forChild(SensorPage), PipesModule]
})
export class SensorPageModule {}
