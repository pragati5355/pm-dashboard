import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { CommandLineModel } from '../models/command-line-model';

@Injectable()
export class MessagingService {
    constructor(private rdb: AngularFireDatabase) {}

    getMessage(id: any): Observable<CommandLineModel> {
        return this.rdb
            .object<CommandLineModel>(`/messageQueue/${id}`)
            .valueChanges();
    }
}
