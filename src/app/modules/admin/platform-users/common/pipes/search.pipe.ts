import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'filter',
})
@Injectable()
export class SearchPipe implements PipeTransform {
    transform(users: any, searchTerm: any): any {
        return users.filter((search) => {
            return (
                search.firstName.toLowerCase().indexOf(searchTerm) > -1 ||
                search.lastName.toLowerCase().indexOf(searchTerm) > -1 ||
                search.firstName.indexOf(searchTerm) > -1 ||
                search.lastName.indexOf(searchTerm) > -1
            );
        });
    }
}
