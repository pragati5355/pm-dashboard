import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MessagingService {
    firebaseConfig = {
        apiKey: 'AIzaSyDW9WFU4SHgkv0NZFKvj-OLG9Pd0lPp5T0',
        authDomain: 'metrics-dev-test-db.firebaseapp.com',
        projectId: 'metrics-dev-test-db',
        storageBucket: 'metrics-dev-test-db.appspot.com',
        messagingSenderId: '47195207410',
        appId: '1:47195207410:web:0f126bbd95afc12e65826b',
        databaseURL: 'https://metrics-dev-test-db-default-rtdb.firebaseio.com/',
    };
    app = initializeApp(this.firebaseConfig);
    constructor() {}

    getMessage() {
        const database = getDatabase(this.app);
        const value = ref(database, '/messageQueue/foxnfork-test');
        onValue(value, (snapshot) => {
            const data = snapshot.val();
            console.log('Messages :', data);
        });
    }
}
