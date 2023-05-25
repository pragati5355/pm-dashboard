import {
    Component,
    ElementRef,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@services/auth/auth.service';
import { SnackBar } from 'app/core/utils/snackBar';
import { ResourcesService } from '../common/services/resources.service';

@Component({
    selector: 'app-resource-upload-csv',
    templateUrl: './resource-upload-csv.component.html',
    styleUrls: ['./resource-upload-csv.component.scss'],
})
export class ResourceUploadCsvComponent implements OnInit {
    @ViewChild('fileUpload') fileUpload: ElementRef;
    submitInProgress: boolean = false;
    uploadFileName: string | null = null;
    resourceUploadSuccessCount: number = 0;
    resourceUploadSkipCount: number = 0;
    csvFileToBeUploaded: File;
    constructor(
        public dialogRef: MatDialogRef<ResourceUploadCsvComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private resourceService: ResourcesService,
        private snackBar: SnackBar,
        private authService: AuthService
    ) {}

    ngOnInit(): void {}

    cancel() {
        this.dialogRef.close();
    }

    onClick(event) {
        if (this.fileUpload) this.fileUpload.nativeElement.click();
    }

    uploadChange({ target }: any) {
        if (target?.files[0]) {
            this.uploadFileName = target?.files[0]?.name;
            this.csvFileToBeUploaded = target?.files[0];
        }
    }

    submit() {
        if (this.csvFileToBeUploaded) {
            this.resourceService.uploadCsv(this.csvFileToBeUploaded).subscribe(
                (res: any) => {
                    this.submitInProgress = false;
                    this.uploadFileName = null;
                    if (res?.error === false) {
                        this.snackBar.successSnackBar(res?.message);
                    }
                    if (res?.error === true) {
                        this.snackBar.errorSnackBar(res?.message);
                    }
                    if (res?.tokenExpire) {
                        this.authService.updateAndReload(window.location);
                    }
                },
                (err) => {
                    this.submitInProgress = false;
                    this.snackBar.errorSnackBar('Something Went Wrong');
                }
            );
        } else {
            this.snackBar.errorSnackBar('Please select a file');
        }
    }

    removeUploadedFile() {
        this.fileUpload.nativeElement.value = '';
        this.uploadFileName = null;
    }
}
