import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {
  transform(input: Array<any>, sep = ','): any {
    let commaSeparated = input.map((value:any)=> value.name).join(sep);
    return commaSeparated;
  }
}