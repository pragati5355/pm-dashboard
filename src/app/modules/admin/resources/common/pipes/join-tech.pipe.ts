import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {
  transform(input: Array<any>, sep = ','): any {
    let commaSeparated = input.map((value:any)=> value.name).join(sep);
    console.log("input",commaSeparated)
    
    return commaSeparated;
    // return input.map(value => value.Name).join(sep);
  }
}