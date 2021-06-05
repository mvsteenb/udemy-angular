import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(value: any, propName: string): any {
    console.log('sorting array by ' + propName + ' : ' + JSON.stringify(value));
    value.sort((a,b) => (a[propName] > b[propName]) ? 1 : ((b[propName] > a[propName]) ? -1 : 0))
    console.log('sorted array: ' + JSON.stringify(value));
    return value;
  }

}
