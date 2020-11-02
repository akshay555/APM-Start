import { pipe } from 'rxjs';
import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
    name:'convertTospaces'
})

export class ConverToSpaces implements PipeTransform
{
    transform(value: String,character: string):string {
        return value.replace(character,' ');
    }

}