import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
@Pipe({
    name: 'diffDate',
})
export class DiffDatePipe implements PipeTransform {
    currentDate = moment();
    transform(value: any): any {
        const startDate = moment(value).format('YYYY-MM-DD HH:mm:ss');
        const year = moment().diff(startDate, 'year');
        const month = moment().diff(startDate, 'months') % 12;
        let diffCount = '-';
        if (year > 0 && month > 0) {
            diffCount = year + ' Year ' + month + ' Month';
        } else if (year == 0 && month > 0) {
            diffCount = month + ' month';
        } else if (year > 0 && month == 0) {
            diffCount = year + ' Year ';
        }
        return diffCount;
    }
}
