import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CapitalizePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  /**
   * Autocapitalizes the first letter of each word in a phrase.
   * Input: {{'john doe' | capitalize}}
   * Output: John Doe
   */
  transform(value: string) {
    if (value) {
      const words = value.split(' ')
      value = words.map((word) => word.substring(0, 1).toUpperCase() + word.substring(1)).join(' ')
    }
    return value
  }
}
