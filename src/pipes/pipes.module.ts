import { NgModule } from '@angular/core';
import { StringToNumberPipe } from './string-to-number/string-to-number';
@NgModule({
  declarations: [StringToNumberPipe],
  imports: [],
  exports: [StringToNumberPipe]
})
export class PipesModule {}
