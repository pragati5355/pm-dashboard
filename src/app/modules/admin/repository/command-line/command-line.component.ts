import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-command-line',
    templateUrl: './command-line.component.html',
    styleUrls: ['./command-line.component.scss'],
})
export class CommandLineComponent implements OnInit {
    messages = [
        'Remote:~ user$ authenticate',
        'Checking stored credentials...',
        'Authentication successful.',
    ];

    constructor() {
        this.initializeDetails;
    }

    ngOnInit(): void {}

    ngAfterViewInit() {
        setInterval(() => {
            this.initializeDetails();
        }, 1000);
    }
    initializeDetails() {
        this.messages.push('Remote:~ user$ ' + 'helloo');
        this.scrollToBottom();
    }

    scrollToBottom() {
        setTimeout(() => {
            // window.scrollTo(0, document.getElementById('scroll').scrollHeight);
            document
                .getElementById('elId')
                .scrollIntoView({ behavior: 'smooth' });
        }, 50);
    }
}
