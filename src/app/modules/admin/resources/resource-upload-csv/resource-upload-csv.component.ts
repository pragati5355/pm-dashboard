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
    resourceUploadSuccessCount: number | null = null;
    resourceUploadSkipCount: number | null = null;
    csvFileToBeUploaded: File | null = null;
    skippedResources: any[] = [];
    csvPreSignedUrl: string | null = null;
    csvTemplateUrl: string;
    resourceUrl: string | null = null;
    reloadResourcesList: boolean = false;
    isFileUploadedToS3: boolean = false;
    showSubmitButton: boolean = true;
    constructor(
        public matDialog: MatDialogRef<ResourceUploadCsvComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private resourceService: ResourcesService,
        private snackBar: SnackBar,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.csvTemplateUrl = this.resourceService.csvDownloadTempletUrl;
    }

    cancel() {
        this.matDialog.close(this.reloadResourcesList);
    }

    onClick() {
        if (this.fileUpload) this.fileUpload.nativeElement.click();
    }

    uploadChange({ target }: any) {
        if (target?.files[0]) {
            this.submitInProgress = true;
            this.csvFileToBeUploaded = target?.files[0];
            const file = target?.files[0];

            const uploadedFile = new FormData();
            uploadedFile.append(
                'file',
                this.csvFileToBeUploaded,
                this.csvFileToBeUploaded?.name
            );

            const payload = {
                fileName: target?.files[0]?.name,
            };
            this.resourceService.getCsvPreSignedUrl(payload).subscribe(
                (res: any) => {
                    this.submitInProgress = false;
                    if (res?.error === false) {
                        this.csvPreSignedUrl = res?.data?.preSignedURL;
                        this.resourceUrl = res?.data?.resourceUrl;

                        if (this.csvPreSignedUrl) {
                            this.submitInProgress = true;
                            this.resourceService
                                .uploadCsvFileToS3(
                                    this.csvPreSignedUrl,
                                    this.csvFileToBeUploaded
                                )
                                .subscribe(
                                    (res: any) => {
                                        this.isFileUploadedToS3 = true;
                                        this.submitInProgress = false;
                                    },
                                    (err) => {
                                        this.submitInProgress = false;
                                        this.snackBar.errorSnackBar(
                                            'Somethin went wrong'
                                        );
                                    }
                                );
                        }
                    } else {
                        this.snackBar.errorSnackBar('Somethin went wrong');
                    }
                    if (res?.tokenExpire) {
                        this.authService.updateAndReload(window.location);
                    }
                },
                (err) => {
                    this.submitInProgress = false;
                    this.snackBar.errorSnackBar('Somethin went wrong');
                }
            );
        }
    }

    submit() {
        if (
            this.csvPreSignedUrl &&
            this.resourceUrl &&
            this.isFileUploadedToS3
        ) {
            this.submitInProgress = true;
            this.reloadResourcesList = false;
            const payload = {
                resourceCsvUrl: this.resourceUrl,
            };
            this.resourceService.csvBulkUpload(payload).subscribe(
                (res: any) => {
                    this.submitInProgress = false;
                    if (res?.error === false) {
                        this.snackBar.successSnackBar(res?.message);
                        this.skippedResources = res?.data?.records;
                        this.resourceUploadSuccessCount = res?.data?.saved;
                        this.resourceUploadSkipCount = res?.data?.skiped;
                        this.showSubmitButton = false;
                        this.reloadResourcesList = true;
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
        this.csvFileToBeUploaded = null;
        this.csvPreSignedUrl = null;
        this.resourceUrl = null;
        this.isFileUploadedToS3 = false;
        this.skippedResources = [];
    }
}
