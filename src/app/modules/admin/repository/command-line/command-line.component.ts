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
    @Input() message: any;
    messages = [];

    constructor() {
        this.initializeDetails;
    }

    ngOnInit(): void {
        if (this.message) {
            this.initializeDetails();
        }
    }
    initializeDetails() {
        this.messages.push(this.message);
        this.scrollToBottom();
    }
    ngOnChanges(changes: SimpleChanges) {
        this.initializeDetails();
    }

    scrollToBottom() {
        setTimeout(() => {
            document
                .getElementById('elId')
                .scrollIntoView({ behavior: 'smooth' });
        }, 50);
    }
}
