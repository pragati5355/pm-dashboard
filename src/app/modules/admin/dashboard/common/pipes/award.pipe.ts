import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'award',
})
export class AwardPipe implements PipeTransform {
    transform(value: string): string {
        if (value) {
            return value
                .replace(/\w\S*/g, function (txt) {
                    return (
                        txt.charAt(0).toUpperCase() +
                        txt.substr(1).toLowerCase()
                    );
                })
                .split('_')
                .join(' ');
        }
        return '';
    }
}
