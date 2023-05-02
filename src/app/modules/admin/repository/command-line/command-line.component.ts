import {
    Component,
    OnInit,
    AfterViewInit,
    Input,
    SimpleChanges,
} from '@angular/core';
import { CommandLineModel } from '../common/models/command-line-model';

@Component({
    selector: 'app-command-line',
    templateUrl: './command-line.component.html',
    styleUrls: ['./command-line.component.scss'],
})
export class CommandLineComponent implements OnInit {
    @Input() data: CommandLineModel;
    messages: CommandLineModel[] = [
        {
            message: 'The repository creation process has begun....',
            completed: false,
            error: false,
        },
    ];

    constructor() {
        this.initializeDetails;
    }

    ngOnInit(): void {
        if (this.data) {
            this.initializeDetails();
        }
    }
    initializeDetails() {
        this.messages.push(this.data);
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
