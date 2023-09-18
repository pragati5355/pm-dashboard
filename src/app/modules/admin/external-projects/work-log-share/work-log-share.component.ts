import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkLogService } from '@modules/admin/project/project-widget/common/services/work-log.service';
import { AuthService } from '@services/auth/auth.service';
import { SnackBar } from 'app/core/utils/snackBar';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-work-log-share',
    templateUrl: './work-log-share.component.html',
    styleUrls: ['./work-log-share.component.scss'],
})
export class WorkLogShareComponent implements OnInit {
    color: any = 'primary';
    checked = false;
    disabled = false;
    shareForm: FormGroup;
    environments: any = environment;
    projectKey: string = '';
    link: string = '';
    isLoading: boolean = false;
    alreadyEnabled: boolean = false;
    existingKey: string | null = null;
    constructor(
        public dialogRef: MatDialogRef<WorkLogShareComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private snackBar: SnackBar,
        private workLogService: WorkLogService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.generateProjectKey();
        this.initializeForm();
        this.getWorkLogLinkData();
    }

    cancel() {
        this.dialogRef.close();
    }

    onToggle(event: any) {
        if (this.alreadyEnabled && !event?.checked) {
            this.isLoading = true;
            const payload = {
                projectId: this.data?.projectId,
                key: this.shareForm?.get('workLogLink')?.value,
                enabled: false,
            };
            this.workLogService
                ?.saveShareLink(payload)
                ?.subscribe((res: any) => {
                    this.isLoading = false;
                    if (res?.code === 200) {
                        this.snackBar.successSnackBar('Disabled link sharing');
                    }
                    if (res?.code === 401) {
                        this.authService.updateAndReload(window.location);
                    }
                });
        }
        if (!this.alreadyEnabled && event?.checked) {
            this.isLoading = true;
            const payload = {
                projectId: this.data?.projectId,
                key: this.shareForm?.get('workLogLink')?.value,
                enabled: true,
            };
            this.workLogService
                ?.saveShareLink(payload)
                ?.subscribe((res: any) => {
                    this.isLoading = false;
                    if (res?.code === 200) {
                    }
                    if (res?.code === 401) {
                        this.authService.updateAndReload(window.location);
                    }
                });
        }
    }

    submit() {
        console.log(
            this.environments.appUrl + '/worklog/project/' + this.projectKey
        );
    }

    generateRandomKey() {
        let result = '';
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 5) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
            counter += 1;
        }
        return result;
    }

    genrateRandomKeyOnClick() {
        this.projectKey = this.generateRandomKey().substring(0, 4);
        this.shareForm?.get('workLogLink')?.setValue(this.projectKey);
    }

    copyLink() {
        if (
            this.existingKey !== this.shareForm?.get('workLogLink')?.value &&
            this.shareForm?.valid
        ) {
            this.isLoading = true;
            const payload = {
                projectId: this.data?.projectId,
                key: this.shareForm?.get('workLogLink')?.value,
                enabled: true,
            };
            this.workLogService
                ?.saveShareLink(payload)
                ?.subscribe((res: any) => {
                    this.isLoading = false;
                    if (res?.code === 200) {
                        this.snackBar.successSnackBar('Link copied');
                    }
                    if (res?.code === 401) {
                        this.authService.updateAndReload(window.location);
                    }
                });
        }

        if (
            this.existingKey === this.shareForm?.get('workLogLink')?.value &&
            this.shareForm?.valid
        ) {
            this.snackBar.successSnackBar('Link copied');
        }
    }
    private getWorkLogLinkData() {
        this.isLoading = true;
        this.workLogService
            ?.getShareLink(this.data?.projectId)
            ?.subscribe((res: any) => {
                this.isLoading = false;
                if (res?.code === 200 && res?.data) {
                    this.shareForm
                        ?.get('workLogLink')
                        ?.setValue(res?.data?.key);
                    this.shareForm
                        ?.get('workLogShare')
                        ?.setValue(res?.data?.enabled);
                    this.existingKey = res?.data?.key;
                    this.alreadyEnabled = res?.data?.enabled ? true : false;
                }
                if (res?.code === 404) {
                    this.shareForm?.get('workLogShare')?.setValue(false);
                    this.shareForm
                        ?.get('workLogLink')
                        ?.setValue(this.projectKey);
                }
                if (res?.code === 401) {
                    this.authService.updateAndReload(window.location);
                }
            });
    }

    private generateProjectKey() {
        const key = this.data?.projectName?.concat(this.generateRandomKey());
        this.projectKey = key.substring(0, 4)?.toUpperCase();
    }

    private initializeForm() {
        this.shareForm = this.fb.group({
            workLogShare: false,
            workLogLink: [
                this.projectKey,
                [
                    Validators.required,
                    Validators.pattern(/^[A-Z0-9]*$/),
                    Validators.minLength(4),
                ],
            ],
        });
    }
}
