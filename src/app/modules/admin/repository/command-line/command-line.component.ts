import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CommandLineModel } from '../common/models/command-line-model';

@Component({
    selector: 'app-command-line',
    templateUrl: './command-line.component.html',
    styleUrls: ['./command-line.component.scss'],
})
export class CommandLineComponent implements OnInit {
    @Input() data: CommandLineModel;
    isCompleted: boolean = false;
    isError: boolean = false;
    messages: CommandLineModel[] = [
        {
            message: 'The repository creation process has begun....',
            completed: false,
            error: false,
        },
    ];

    constructor(private router: Router) {
        this.initializeDetails;
    }

    ngOnInit(): void {
        if (this.data) {
            this.initializeDetails();
        }
    }
    initializeDetails() {
        this.isCompleted = this.data?.completed;
        this.isError = this.data?.error;
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

    redirectToRepoList() {
        this.router.navigate(['/projects/repository/list']);
    }
}
