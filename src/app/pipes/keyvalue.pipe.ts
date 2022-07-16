import { Pipe, PipeTransform } from '@angular/core';
import {KeyValue} from "@angular/common";

@Pipe({
  name: 'keyvalue'
})
export class KeyvaluePipe implements PipeTransform {

  transform(value: Object): KeyValue<any, any>[] {
    let keyvalue: KeyValue<any, any>[] = []
    let listOfKeys = Object.keys(value)
    let listOfValues = Object.values(value)
    listOfKeys.forEach((key, index)=>{
      keyvalue.push({
        key: listOfKeys[index],
        value: listOfValues[index]
      })
    })
    return keyvalue
  }

}
