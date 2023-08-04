import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBar } from 'app/core/utils/snackBar';
import { SECONDARY_TIMES, PRIMARY_TIMES } from '../common/constants';
import { ExternalProjectService } from '../common/services/external-project.service';

@Component({
    selector: 'app-send-reminders',
    templateUrl: './send-reminders.component.html',
    styleUrls: ['./send-reminders.component.scss'],
})
export class SendRemindersComponent implements OnInit {
    firstReminderCheck: boolean = false;
    secondReminderCheck: boolean = false;
    thirdReminderCheck: boolean = false;
    firstReminderControl: any = '';
    secondReminderControl: any = '';
    thirdReminderControl: any = '';
    secondSelect: any = null;
    thirdSelect: any = null;
    firstSelect: any = null;
    primaryTimings: any[] = PRIMARY_TIMES;
    secondaryTimings: any[] = SECONDARY_TIMES;
    isLoading: boolean = false;
    constructor(
        public dialogRef: MatDialogRef<SendRemindersComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackBar: SnackBar,
        private externalProjectService: ExternalProjectService
    ) {}

    ngOnInit(): void {
        const reminderModel = [
            {
                reminderType: 'FIRST',
                time: '19:00',
                sourceType: 'SLACK',
            },
            {
                reminderType: 'SECOND',
                time: '19:05',
                sourceType: 'SLACK',
            },
            {
                reminderType: 'THIRD',
                time: '19:10',
                sourceType: 'SLACK',
            },
        ];

        this.patchReminders();
    }

    cancel() {
        this.dialogRef.close();
    }

    changeTime(event: any) {
        this.firstReminderControl = event?.source?.value;
        this.secondSelect = null;
        this.thirdSelect = null;
        this.secondReminderControl = '';
        this.thirdReminderControl = '';
    }

    changeTimeSecond(event: any) {
        this.thirdSelect = null;
        this.secondReminderControl = event?.source?.value;
        this.thirdReminderControl = '';
    }
    changeTimeThird(event: any) {
        this.thirdReminderControl = event?.source?.value;
    }

    firstReminderCheckbox($event: any) {
        if (!$event?.checked) {
            this.thirdSelect = null;
            this.secondSelect = null;
            this.firstSelect = null;
            this.firstReminderControl = '';
            this.secondReminderControl = '';
            this.thirdReminderControl = '';
            this.secondReminderCheck = false;
            this.thirdReminderCheck = false;
        } else {
        }
    }

    secondReminderCheckbox($event: any) {
        if (!$event?.checked) {
            this.secondSelect = null;
            this.thirdSelect = null;
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
            this.thirdSelect = null;
            this.thirdReminderCheck = false;
        } else {
            this.thirdReminderCheck = true;
        }
    }

    submit() {
        if (this.firstReminderCheck && this.firstReminderControl === '') {
            this.snackBar.errorSnackBar('Select time for reminder');
            return;
        }
        if (this.secondReminderCheck && this.secondReminderControl === '') {
            this.snackBar.errorSnackBar('Select time for reminder');
            return;
        }
        if (this.thirdReminderCheck && this.thirdReminderControl === '') {
            this.snackBar.errorSnackBar('Select time for reminder');
            return;
        }

        if (
            !this.firstReminderCheck &&
            this.firstReminderControl === '' &&
            !this.secondReminderCheck &&
            this.secondReminderControl === '' &&
            !this.thirdReminderCheck &&
            this.thirdReminderControl === ''
        ) {
            this.snackBar.errorSnackBar('Select reminder');
            return;
        }

        const payload = this.getPayload();
        this.isLoading = true;
        this.externalProjectService
            .sendReminder(payload)
            .subscribe((res: any) => {
                this.isLoading = false;
                if (!res?.error) {
                    this.snackBar.successSnackBar(res?.message);
                    this.dialogRef.close(true);
                } else {
                    this.snackBar.errorSnackBar(res?.message);
                }
            });
    }

    clearReminders() {
        const payload = {
            id: this.data?.projectSettings?.id,
            projectId: this.data?.projectModel?.id,
            deleted: true,
        };
        this.isLoading = true;
        this.externalProjectService
            .sendReminder(payload)
            .subscribe((res: any) => {
                this.isLoading = false;
                if (!res?.error) {
                    this.snackBar.successSnackBar(res?.message);
                    this.dialogRef.close(true);
                } else {
                    this.snackBar.errorSnackBar(res?.message);
                }
            });
    }

    private patchReminders() {
        this.data?.projectSettings?.reminderModel?.map((item) => {
            if (item?.reminderType === 'FIRST') {
                const idx = PRIMARY_TIMES?.findIndex(
                    (obj) => obj.value === item?.time
                );
                this.firstSelect = PRIMARY_TIMES[idx];
                this.firstReminderControl = this.firstSelect;
                this.firstReminderCheck = true;
            }
            if (item?.reminderType === 'SECOND') {
                const idx = PRIMARY_TIMES?.findIndex(
                    (obj) => obj.value === item?.time
                );
                this.secondSelect = PRIMARY_TIMES[idx];
                this.secondReminderControl = this.secondSelect;
                this.secondReminderCheck = true;
            }
            if (item?.reminderType === 'THIRD') {
                const idx = SECONDARY_TIMES?.findIndex(
                    (obj) => obj.value === item?.time
                );
                this.thirdSelect = SECONDARY_TIMES[idx];
                this.thirdReminderControl = this.thirdSelect;
                this.thirdReminderCheck = true;
            }
        });
    }

    private getPayload() {
        const payload = {
            id: this.data?.projectSettings?.id
                ? this.data?.projectSettings?.id
                : null,
            projectId: this.data?.projectModel?.id,
            sourceType: 'SLACK',
            deleted: false,
            reminderModel: [
                {
                    reminderType: 'FIRST',
                    time: this.firstReminderControl?.value,
                },
                {
                    reminderType: 'SECOND',
                    time: this.secondReminderControl?.value,
                },
                {
                    reminderType: 'THIRD',
                    time: this.thirdReminderControl?.value,
                },
            ],
        };
        for (let i = 0; i < payload?.sourceType?.length - 1; i++) {
            if (payload?.reminderModel[i]?.time === undefined) {
                delete payload?.reminderModel[i];
            }
        }
        const timeModel = payload?.reminderModel?.filter((item) => item);
        payload.reminderModel = timeModel;
        return payload;
    }
}
