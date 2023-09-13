import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'sanitizeHtml' })
export class SanitizeHtmlPipe implements PipeTransform {
    constructor(private _sanitizer: DomSanitizer) {}

    transform(value: any): SafeHtml {
        // value = this._sanitizer.bypassSecurityTrustStyle(value);
        return this._sanitizer.bypassSecurityTrustHtml(value);
    }
}
