import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'first'
})
export class FirstPipe implements PipeTransform {

  transform(value: any, ...args): any {
    let newString = value;
    if (args[0]){
      newString += "."
    }
    if(args[1]=='singlequotes'){
      newString = "'"+ newString
    }else if(args[1]=='doublequotes'){
      newString = '"'+ newString
    }
    return newString;
  }

}
