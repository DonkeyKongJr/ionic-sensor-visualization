import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the StringToNumberPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'stringToNumber'
})
export class StringToNumberPipe implements PipeTransform {
  /**
   * Takes a string and returns a toFixed(2) number.
   */
  transform(value: string, ...args) {
    return new Number(value).toFixed(2);
  }
}
