import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBar } from 'app/core/utils/snackBar';
import { ExternalProjectService } from '../common/services/external-project.service';

@Component({
    selector: 'app-external-project-settings',
    templateUrl: './external-project-settings.component.html',
    styleUrls: ['./external-project-settings.component.scss'],
})
export class ExternalProjectSettingsComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ExternalProjectSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackBar: SnackBar,
        private externalProjectService: ExternalProjectService
    ) {}

    ngOnInit(): void {}

    cancel() {
        this.dialogRef.close();
    }
}
