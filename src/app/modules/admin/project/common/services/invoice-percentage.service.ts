import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'app/core/constacts/constacts';

@Injectable({
    providedIn: 'root',
})
export class InvoicePercentageService {
    invoicePercentageUrl = AppConstants['PROJECT_API_URL'] + '/';

    constructor(private http: HttpClient) {}

    invoicePercentage(payload: any) {
        return this.http.post(this.invoicePercentageUrl, payload);
    }
}
