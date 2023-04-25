import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable()
export class MessagingService {
    constructor(private rdb: AngularFireDatabase) {}

    getMessage(id: any):Observable<any> {
        return this.rdb.object(`/messageQueue/${id}`).valueChanges();
    }
}
