import {
    Component,
    ElementRef,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBar } from 'app/core/utils/snackBar';

@Component({
    selector: 'app-name-resume-version',
    templateUrl: './name-resume-version.component.html',
    styleUrls: ['./name-resume-version.component.scss'],
})
export class NameResumeVersionComponent implements OnInit {
    @ViewChild('fileUpload') fileUpload: ElementRef;
    resumeVersionForm: FormGroup;
    submitInProgress: boolean = false;
    resumeFileToBeUploaded: any;
    preSignedUrl: string | null = null;
    isFileUploadedToS3: boolean = false;
    resourceUrl: string | null = null;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private matDialogRef: MatDialogRef<NameResumeVersionComponent>,
        private snackBar: SnackBar
    ) {}

    ngOnInit(): void {
        this.resumeVersionForm = this.formBuilder.group({
            name: ['', [Validators.required]],
        });
    }

    submit() {
        if (this.resumeVersionForm?.valid && this.data?.mode === 'SAVE') {
            const payload = {
                data: this.data?.formValues,
                projects: this.data?.projects,
                versionName: this.resumeVersionForm?.get('name')?.value,
            };
            console.log(payload);
        }

        if (this.data?.mode === 'UPLOAD') {
        }
    }

    uploadChange({ target }: any) {
        if (target?.files[0]) {
            this.submitInProgress = true;
            this.resumeFileToBeUploaded = target?.files[0];
            const file = target?.files[0];

            const uploadedFile = new FormData();
            uploadedFile.append(
                'file',
                this.resumeFileToBeUploaded,
                this.resumeFileToBeUploaded?.name
            );

            const payload = {
                fileName: target?.files[0]?.name,
            };
            // this.resourceService.getPreSignedUrl(payload).subscribe(
            //     (res: any) => {
            //         this.submitInProgress = false;
            //         if (res?.error === false) {
            //             this.preSignedUrl = res?.data?.preSignedURL;
            //             this.resourceUrl = res?.data?.resourceUrl;
            //             if (this.preSignedUrl) {
            //                 this.submitInProgress = true;
            //                 this.resourceService
            //                     .uploadFileToS3(
            //                         this.preSignedUrl,
            //                         this.resumeFileToBeUploaded
            //                     )
            //                     .subscribe(
            //                         (res: any) => {
            //                             this.isFileUploadedToS3 = true;
            //                             this.submitInProgress = false;
            //                         },
            //                         (err) => {
            //                             this.submitInProgress = false;
            //                             this.snackBar.errorSnackBar(
            //                                 'Somethin went wrong'
            //                             );
            //                         }
            //                     );
            //             }
            //         } else {
            //             this.snackBar.errorSnackBar('Somethin went wrong');
            //         }
            //     },
            //     (err) => {
            //         this.submitInProgress = false;
            //         this.snackBar.errorSnackBar('Somethin went wrong');
            //     }
            // );
        }
    }

    onClick() {
        if (this.fileUpload) this.fileUpload.nativeElement.click();
    }

    removeUploadedFile() {
        this.fileUpload.nativeElement.value = '';
        this.resumeFileToBeUploaded = null;
        this.preSignedUrl = null;
        this.resourceUrl = null;
        this.isFileUploadedToS3 = false;
    }

    cancel() {
        this.matDialogRef.close();
    }
}
