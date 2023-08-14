import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stripHtml',
})
export class StripHtmlPipe implements PipeTransform {
    transform(value: any): any {
        return value.replace(/<.*?>/g, '');
    }
}
