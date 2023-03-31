import {
    Component,
    OnInit,
    AfterViewInit,
    Input,
    SimpleChanges,
} from '@angular/core';

@Component({
    selector: 'app-command-line',
    templateUrl: './command-line.component.html',
    styleUrls: ['./command-line.component.scss'],
})
export class CommandLineComponent implements OnInit {
    // messages: any;
    // @Input()
    // set messagesArray(value) {
    //     if (value) {
    //         this.messages = value;
    //     }
    // }
    @Input() message: any;
    messages = [
        'Remote:~ user$ authenticate',
        'Checking stored credentials...',
        'Authentication successful.',
    ];

    constructor() {
        this.initializeDetails;
    }

    ngOnInit(): void {
        console.log(this.messages);
        this.messages.push(this.message);
    }

    // ngAfterViewInit() {
    //     setInterval(() => {
    //         this.initializeDetails();
    //     }, 1000);
    // }
    initializeDetails() {
        this.messages.push('Remote:~ user$ ' + 'helloo');
        this.scrollToBottom();
    }
    ngOnChanges(changes: SimpleChanges) {
        console.log('OnChanges');
        console.log(JSON.stringify(changes));

        // tslint:disable-next-line:forin
        this.initializeDetails();
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
