import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@services/auth/auth.service';
import { SnackBar } from 'app/core/utils/snackBar';
import { WeeklyStatusService } from '../common/services/weekly-status.service';

@Component({
    selector: 'app-weekly-feedback-form',
    templateUrl: './weekly-feedback-form.component.html',
    styleUrls: ['./weekly-feedback-form.component.scss'],
})
export class WeeklyFeedbackFormComponent implements OnInit {
    public form!: any;
    projectId: any;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<WeeklyFeedbackFormComponent>,
        private weeklyStatuService: WeeklyStatusService,
        private snackBar: SnackBar,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.projectId = this.data?.projectId;
        this.form = this.data?.form?.formComponent;
    }

    submit(event: any) {
        const payload = {
            projectId: this.projectId,
            formComponent: this.data?.form?.formComponent,
            formResponse: event?.data,
        };
        this.weeklyStatuService
            .saveWeeklyStatusForm(payload)
            .subscribe((res: any) => {
                if (!res?.error) {
                    this.snackBar.successSnackBar(res?.message);
                    this.matDialogRef.close(true);
                } else {
                    this.snackBar.errorSnackBar(res?.message);
                }
                if (res?.tokenExpire) {
                    this.authService.updateAndReload(window.location);
                }
            });
    }

    close() {
        this.matDialogRef.close();
    }
}
