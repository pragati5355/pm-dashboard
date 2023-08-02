import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBar } from 'app/core/utils/snackBar';
import { SECONDARY_TIMES, PRIMARY_TIMES } from '../common/constants';

@Component({
    selector: 'app-send-reminders',
    templateUrl: './send-reminders.component.html',
    styleUrls: ['./send-reminders.component.scss'],
})
export class SendRemindersComponent implements OnInit {
    firstReminderCheck: boolean = true;
    secondReminderCheck: boolean = true;
    thirdReminderCheck: boolean = true;
    firstReminderControl: any = '';
    secondReminderControl: any = '';
    thirdReminderControl: any = '';
    secondSelect: any;
    thirdSelect: any;
    primaryTimings: any[] = PRIMARY_TIMES;
    secondaryTimings: any[] = SECONDARY_TIMES;
    isLoading: boolean = false;
    constructor(
        public dialogRef: MatDialogRef<SendRemindersComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackBar: SnackBar
    ) {}

    ngOnInit(): void {}

    cancel() {
        this.dialogRef.close();
    }

    changeTime(event: any) {
        this.firstReminderControl = event?.source?.value;
        this.secondSelect = null;
    }

    changeTimeSecond(event: any) {
        this.thirdSelect = null;
        this.secondReminderControl = event?.source?.value;
    }
    changeTimeThird(event: any) {
        this.thirdReminderControl = event?.source?.value;
    }

    firstReminderCheckbox($event: any) {
        if (!$event?.checked) {
            this.thirdSelect = null;
            this.secondSelect = null;
            this.firstReminderControl = '';
            this.secondReminderControl = '';
            this.thirdReminderControl = '';
            this.secondReminderCheck = false;
            this.thirdReminderCheck = false;
        } else {
            this.secondReminderCheck = true;
            this.thirdReminderCheck = true;
        }
    }

    secondReminderCheckbox($event: any) {
        if (!$event?.checked) {
            this.secondSelect = null;
            this.secondReminderControl = '';
            this.thirdReminderControl = '';
            this.secondReminderCheck = false;
            this.thirdReminderCheck = false;
        } else {
            this.secondReminderCheck = true;
        }
    }

    thirdReminderCheckbox($event: any) {
        if (!$event?.checked) {
            this.thirdReminderControl = '';
            this.thirdReminderCheck = false;
        } else {
            this.thirdReminderCheck = true;
        }
    }

    submit() {
        console.log(
            this.firstReminderControl,
            this.secondReminderControl,
            this.thirdReminderControl
        );
    }
}
