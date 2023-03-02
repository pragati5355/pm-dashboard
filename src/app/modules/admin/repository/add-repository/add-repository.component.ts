import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationConstants } from '../../../../core/constacts/constacts';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { MatStepperIntl } from '@angular/material/stepper';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@services/auth/auth.service';
import { SnackBar } from '../../../../core/utils/snackBar';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {
    MatAutocompleteSelectedEvent,
    MatAutocomplete,
} from '@angular/material/autocomplete';
import { RepositoryService } from '@modules/admin/repository/common/services/repository.service';
import { UploadServiceService } from '@modules/admin/repository/common/services/upload-service.service';
import { SendMailComponent } from '../send-mail/send-mail.component';
import { items } from 'app/mock-api/apps/file-manager/data';
export class Developer {
    constructor(public id: number, public email: string) {}
}
@Component({
    selector: 'app-add-repository',
    templateUrl: './add-repository.component.html',
    styleUrls: ['./add-repository.component.scss'],
})
export class AddRepositoryComponent implements OnInit {
    @ViewChild('stepper', { static: false }) stepper!: MatStepper;
    @ViewChild('drawer') drawer!: MatDrawer;
    @ViewChild('repositoryInput') repositoryInput!: ElementRef;
    @ViewChild('auto', { static: false }) matAutocomplete: any;
    @ViewChild('branchInput') branchInput!: ElementRef;
    @ViewChild('developerInput') developerInput!: ElementRef;
    @ViewChild('codeReviewerInput') codeReviewerInput!: ElementRef;
    pageTitle = 'add';
    selectedIndex = 0;
    showStep = 1;
    initialLoading: boolean = false;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    jiraProjectName = '';
    bitbucketRepositoryName = '';
    routeSubscribe: any;
    userData: any;
    createBitbucketProjectFrom!: FormGroup;
    angularForm!: FormGroup;
    emailInvalid = false;
    formType: any = '';
    isFormType = false;
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = false;
    separatorKeysCodes: number[] = [ENTER];
    addOnBlurRepository = false;
    filteredRepositories!: Observable<any[]> | undefined;
    repositories: any = [];
    allRepositories: any = [];
    isRepository = false;
    //branch filter value
    addOnBlurBranch = false;
    filteredBranches: Observable<any[]> | undefined;
    branches: any = ['master', 'staging', 'development'];
    allBranches: any = ['master', 'staging', 'development', 'testing'];

    // developer filter value
    developer = new FormControl();
    filteredDevelopers: Observable<any[]> | undefined;
    developers: any = [];
    allDevelopers: Developer[] = [];
    newExternalDeveloper: any = [];
    allNewExternalDevelopers: any = [];
    newExternalDevelopersEmail: any = [];
    // code reviewer filter value
    codeReviewerCtrl = new FormControl();
    filteredCodeReviewers: Observable<any[]> | undefined;
    codeReviewers: any = [];
    allCodeReviewers: any = [];

    // bitbucket project field
    bitbucketProjectName = '';
    myControl = new FormControl();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    get createBitbucketProject(): { [key: string]: AbstractControl } {
        return this.createBitbucketProjectFrom.controls;
    }
    // portal field
    portalNameOrMicroserviceNames: string[] = [];
    @ViewChild('portalNameOrMicroserviceNameInput', { static: false })
    portalNameOrMicroserviceNameInput: ElementRef<HTMLInputElement>;

    @ViewChild('fileUpload')
    fileUpload: ElementRef;

    uploadInProcess = false;
    uploadResourceUrl = '';
    isFileUploaded = false;
    metricsProjectData: any;
    draftObj: any;
    draftId = null;

    submitInProcess = false;
    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _matStepperIntl: MatStepperIntl,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private dialog: MatDialog,
        private router: Router,
        private RepositoryService: RepositoryService,
        private snackBar: SnackBar,
        private _route: ActivatedRoute,
        private _uploadService: UploadServiceService
    ) {}

    ngOnInit(): void {
        this.setUserData();
        this.setJiraProject();
        this.setDrawerWatcher();
        // this.initializeForm();
        this.fetchDraft();
        this.getAllDevelopers();
        this.getCodeReviewer();
    }

    toggle() {
        this.drawerOpened = !this.drawerOpened;
    }

    goBack(stepper: any) {
        // stepper.previous();
        this.selectedIndex = stepper;
        if (this.selectedIndex == 0) {
            this.showStep = 1;
        } else if (this.selectedIndex == 1) {
            this.showStep = 2;
        } else if (this.selectedIndex == 2) {
            this.showStep = 3;
            this.isFileUploaded = true;
        } else if (this.selectedIndex == 3) {
            this.showStep = 4;
        }
    }

    selectionChange($event: any): void {
        if ($event.selectedIndex == 0) {
            this.showStep = 1;
        } else if ($event.selectedIndex == 1) {
            this.showStep = 2;
        } else if ($event.selectedIndex == 2) {
            this.showStep = 3;
            this.isFileUploaded = true;
        } else if ($event.selectedIndex == 3) {
            this.showStep = 4;
        }
        this.selectedIndex = $event.selectedIndex;
    }

    goto(index: number): void {
        if (index == 0) return; // First step is not selected anymore -ok

        this.selectedIndex = index;
    }

    getTechnology(name: any) {
        this.selectedIndex = 1;
        this.showStep = 2;
        this.allRepositories = [];
        if (this.formType != name) {
            this.formType = name;
            this.initializeForm();
            this.uploadResourceUrl = '';
            this.codeReviewers = [];
            this.repositories = [];
            this.developers = [];
            this.portalNameOrMicroserviceNames = [];
        }
    }
    //developer filter function start
    _filterDevelopers(value: any) {
        console.log(value, 'value');
        const filterValue = value.toLowerCase();
        return this.allDevelopers.filter(
            (developer: any) =>
                developer.email.toLowerCase().indexOf(filterValue) === 0 &&
                !this.developers.includes(developer.email)
        );
    }
    _filterDevelopersSlice() {
        this.emailInvalid = false;
        return this.allDevelopers.filter(
            (allDevelopers) => !this.developers.includes(allDevelopers.email)
        );
    }
    addDeveloper(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        // Add our developer
        this.emailInvalid = false;
        // if (typeof value == 'string') {
        //     if (this.validateEmail(value)) {
        //         this.newExternalDeveloper.push(value);
        //         let max =
        //             Math.max.apply(
        //                 Math,
        //                 this.allDevelopers.map((ele) => ele.id)
        //             ) + 1;
        //         this.allDevelopers.push({ id: max, email: event.value });
        //         this.developers.push(value);
        //         this.allNewExternalDevelopers.push({
        //             id: max,
        //             email: event.value,
        //         });
        //         this.emailInvalid = false;
        //         if (input) {
        //             input.value = '';
        //         }
        //     } else {
        //         this.emailInvalid = true;
        //     }
        // }
        this.developer.setValue('');
        this.createBitbucketProjectFrom.get('developer')?.setValue('');
    }

    removeDeveloper(developer: any, selectIndex: any): void {
        this.developers.splice(selectIndex, 1);

        const found = this.newExternalDeveloper.some(
            (el: any) => el === developer
        );
        if (found) {
            this.newExternalDeveloper.splice(selectIndex, 1);
            let filteredExternalProject: any =
                this.allNewExternalDevelopers.filter(
                    (item: any) => item.email === developer
                );
            this.newExternalDeveloper.forEach((element: any, index: any) => {
                if (element == filteredExternalProject[0].name)
                    this.newExternalDeveloper.splice(index, 1);
            });
            this.allDevelopers.forEach((element: any, index: any) => {
                if (element.email == developer)
                    this.allDevelopers.splice(index, 1);
            });
            this.newExternalDeveloper.forEach((element: any, index: any) => {
                if (element.email == developer)
                    this.newExternalDeveloper.splice(index, 1);
            });
        }

        if (this.developers.length == 0) {
            this.createBitbucketProjectFrom.get('developer')?.setValue([]);
        } else {
            this.createBitbucketProjectFrom.get('developer')?.setValue('');
        }
    }

    selectedDeveloper(event: MatAutocompleteSelectedEvent): void {
        this.emailInvalid = false;
        this.developers.push(event.option.value);
        this.developerInput.nativeElement.value = '';
        this.developer.setValue('');
        this.createBitbucketProjectFrom.get('developer')?.setValue('');
    }

    getAllDevelopers() {
        this.initialLoading = true;
        this.RepositoryService.findAllDeveloperEmails().subscribe(
            (res: any) => {
                this.allDevelopers = res.data;
                this.filteredDevelopers = this.createBitbucketProjectFrom
                    .get('developer')
                    ?.valueChanges.pipe(
                        startWith(''),
                        map((developer: any | null) =>
                            developer
                                ? this._filterDevelopers(developer)
                                : this._filterDevelopersSlice()
                        )
                    );
                this.initialLoading = false;
                if (res.tokenExpire == true) {
                    this._authService.updateAndReload(window.location);
                }
            }
        );
    }
    //developer filter function end
    // repository filter function start
    changeProject(event: any) {
        let projectName = this.createBitbucketProjectFrom.value.projectName;
        if (this.formType == 'react-native') {
            this.allRepositories = [
                projectName + '-' + this.formType,
                projectName + '-' + this.formType + '-config',
            ];
        }
        if (this.portalNameOrMicroserviceNames.length > 0) {
            this.portalNameOrMicroserviceNames.forEach((item: any) => {
                this.allRepositories.push(
                    projectName + '-' + item + '-' + this.formType
                );
                this.allRepositories.push(
                    projectName + '-' + item + '-' + this.formType + '-config'
                );
            });
        }
        this.filteredRepositories = this.createBitbucketProjectFrom
            .get('repositoryName')
            ?.valueChanges.pipe(
                startWith(''),
                map((repository: string | null) =>
                    repository
                        ? this._filterRepository(repository)
                        : this._filterRepositoriesSlice()
                )
            );
    }
    addRepository(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        // Add our repository
        if ((value || '').trim()) {
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
        this.createBitbucketProjectFrom.get('repositoryName')?.setValue('');
    }

    removeRepository(repository: string): void {
        const index = this.repositories.indexOf(repository);
        if (index >= 0) {
            this.repositories.splice(index, 1);
        }
        if (this.repositories.length == 0) {
            this.createBitbucketProjectFrom.get('repositoryName')?.setValue([]);
        }
    }

    selectedRepository(event: MatAutocompleteSelectedEvent): void {
        this.repositories.push(event.option.viewValue);
        this.repositoryInput.nativeElement.value = '';
        this.createBitbucketProjectFrom.get('repositoryName')?.setValue('');
    }

    private _filterRepository(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allRepositories.filter(
            (repository: any) =>
                repository.toLowerCase().indexOf(filterValue) === 0 &&
                !this.repositories.includes(repository)
        );
    }
    _filterRepositoriesSlice() {
        return this.allRepositories.filter(
            (allRepositories: any) =>
                !this.repositories.includes(allRepositories)
        );
    }
    // repository filter function end

    // branch filter function start
    addBranch(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        if ((value || '').trim()) {
        }
        if (input) {
            input.value = '';
        }
        this.createBitbucketProjectFrom.get('branchOrPattern')?.setValue('');
    }

    removeBranch(branch: string): void {
        const index = this.branches.indexOf(branch);
        if (index >= 0) {
            this.branches.splice(index, 1);
        }
        if (this.branches.length == 0) {
            this.createBitbucketProjectFrom
                .get('branchOrPattern')
                ?.setValue([]);
        } else {
            this.createBitbucketProjectFrom
                .get('branchOrPattern')
                ?.setValue('');
        }
    }

    selectedBranch(event: MatAutocompleteSelectedEvent): void {
        this.branches.push(event.option.viewValue);
        this.branchInput.nativeElement.value = '';
        this.createBitbucketProjectFrom.get('branchOrPattern')?.setValue('');
    }

    private _filterBranch(value: string) {
        const filterValue = value.toLowerCase();
        return this.allBranches.filter(
            (branch: any) =>
                branch.toLowerCase().indexOf(filterValue) === 0 &&
                !this.branches.includes(branch)
        );
    }
    _filterBranchSlice() {
        return this.allBranches.filter(
            (allBranches: any) => !this.branches.includes(allBranches)
        );
    }
    // branch filter functions end

    // code reviewer filter function start
    getCodeReviewer() {
        this.RepositoryService.findAllMembers().subscribe((res: any) => {
            res.data.forEach((item: any) => {
                this.allCodeReviewers.push(item.user);
            });
            this.filteredCodeReviewers = this.createBitbucketProjectFrom
                .get('codeReviewerAndPm')
                ?.valueChanges.pipe(
                    startWith(null),
                    map((codeReviewer: string | null) =>
                        codeReviewer
                            ? this._filterCodeReviewer(codeReviewer)
                            : this._filterCodeReviewerSlice()
                    )
                );
            this.initialLoading = false;
            if (res.tokenExpire == true) {
                this._authService.updateAndReload(window.location);
            }
        });
    }
    addCodeReviewer(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        // Add our codeReviewer
        if ((value || '').trim()) {
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
        this.createBitbucketProjectFrom.get('codeReviewerAndPm')?.setValue('');
    }

    removeCodeReviewer(codeReviewer: any, indx: any) {
        this.codeReviewers.splice(indx, 1);
        if (this.codeReviewers.length == 0) {
            this.createBitbucketProjectFrom
                .get('codeReviewerAndPm')
                ?.setValue([]);
        } else {
            this.createBitbucketProjectFrom
                .get('codeReviewerAndPm')
                ?.setValue('');
        }
    }

    selectedCodeReviewer(event: MatAutocompleteSelectedEvent): void {
        this.codeReviewers.push(event.option.value);
        this.codeReviewerInput.nativeElement.value = '';
        this.createBitbucketProjectFrom.get('codeReviewerAndPm')?.setValue('');
    }

    private _filterCodeReviewer(value: any) {
        if (typeof value == 'object') {
            return this.allCodeReviewers.filter((codeReviewer: any) =>
                codeReviewer.display_name
                    .toLowerCase()
                    .includes(
                        value.display_name.toLowerCase() &&
                            !this.codeReviewers.includes(codeReviewer)
                    )
            );
        } else {
            return this.allCodeReviewers.filter(
                (codeReviewer: any) =>
                    codeReviewer.display_name
                        .toLowerCase()
                        .includes(value.toLowerCase()) &&
                    !this.codeReviewers.includes(codeReviewer)
            );
        }
    }
    _filterCodeReviewerSlice() {
        return this.allCodeReviewers.filter(
            (allCodeReviewers: any) =>
                !this.codeReviewers.includes(allCodeReviewers)
        );
    }

    returnFn(bitbucketProject?: any) {
        if (typeof bitbucketProject == 'object') {
            return bitbucketProject ? bitbucketProject.projectName : undefined;
        }
    }

    //bitbucket project filter function end
    private validateEmail(email: any) {
        var re = ValidationConstants.EMAIL_VALIDATION;
        return re.test(String(email).toLowerCase());
    }
    private validateChipField(validateChipField: FormControl) {
        if (validateChipField.value && validateChipField.value.length === 0) {
            return {
                validateChipFieldArray: { valid: false },
            };
        }
        return null;
    }

    private addBranchFilterSubscription() {
        this.filteredBranches = this.createBitbucketProjectFrom
            .get('branchOrPattern')
            ?.valueChanges.pipe(
                startWith(''),
                map((branch: any | null) =>
                    branch
                        ? this._filterBranch(branch)
                        : this._filterBranchSlice()
                )
            );
    }

    // Add portal function

    addPortal(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        this.isRepository = false;
        // Add our portalNameOrMicroserviceName
        if ((value || '').trim()) {
            this.portalNameOrMicroserviceNames.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.createBitbucketProjectFrom
            .get('portalNameOrMicroserviceName')
            ?.setValue('');
    }

    removePortal(portalNameOrMicroserviceName: string): void {
        if (this.portalNameOrMicroserviceNames.length == 1) {
            this.isRepository = true;
            this.createBitbucketProjectFrom
                .get('portalNameOrMicroserviceName')
                ?.setValue([]);
        }
        let index = this.portalNameOrMicroserviceNames.indexOf(
            portalNameOrMicroserviceName
        );

        if (index >= 0) {
            this.portalNameOrMicroserviceNames.splice(index, 1);
        }
    }

    private setJiraProject() {
        this.metricsProjectData = this._authService.getProjectDetails();
        let jiraProjectName = this.metricsProjectData.name.toLowerCase();
        this.jiraProjectName = jiraProjectName.replace(/\s/g, '-');
        this.bitbucketRepositoryName = this.metricsProjectData.repoProject.name;
    }

    private setUserData() {
        this.userData = this._authService.getUser();
    }

    private initializeForm() {
        this.createBitbucketProjectFrom = this._formBuilder.group({
            bitbucketProjectName: [
                { value: this.bitbucketRepositoryName, disabled: true },
                [Validators.required],
            ],
            projectName: [this.jiraProjectName, [Validators.required]],
            repositoryName: [[], this.validateChipField],
            developer: [[], this.validateChipField],
            codeReviewerAndPm: [[], this.validateChipField],
            branchOrPattern: [this.branches, this.validateChipField],
        });
        if (
            this.formType == 'angular' ||
            this.formType == 'react-js' ||
            this.formType == 'django' ||
            this.formType == 'java'
        ) {
            this.createBitbucketProjectFrom.addControl(
                'portalNameOrMicroserviceName',
                new FormControl([], this.validateChipField)
            );
            this.isRepository = true;
        } else {
            this.isRepository = false;
            this.createBitbucketProjectFrom.removeControl(
                'portalNameOrMicroserviceName'
            );
        }
        this.addBranchFilterSubscription();
    }

    private setDrawerWatcher() {
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Set the drawerMode and drawerOpened if the given breakpoint is active
                if (matchingAliases.includes('md')) {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                } else {
                    this.drawerMode = 'side';
                    this.drawerOpened = false;
                }
            });
    }
    submitBitbucketProject() {
        if (!this.createBitbucketProjectFrom.invalid) {
            this.selectedIndex = 2;
            this.showStep = 3;
            this.isFileUploaded = true;
        }
    }
    submitAnsibleScript() {
        if (this.uploadResourceUrl) {
            this.selectedIndex = 3;
            this.showStep = 4;
        } else {
            this.isFileUploaded = false;
        }
    }
    submit() {
        const newCodeReviewers = [];
        this.codeReviewers.forEach((items) => {
            newCodeReviewers.push(items.uuid);
        });
        if (!this.createBitbucketProjectFrom.invalid) {
            this.submitInProcess = true;
            const payload = {
                repoNames: this.repositories,
                branchName: this.branches,
                email: this.developers,
                mergeAccessUserUUIDs: newCodeReviewers,
                projectKey: this.metricsProjectData.repoProject.key,
                scriptUrl: this.uploadResourceUrl,
                technology: this.formType,
                metricsProjectId: this.metricsProjectData.id,
            };
            this.RepositoryService.create(payload).subscribe(
                (res: any) => {
                    if (!res.error) {
                        this.snackBar.successSnackBar(res.message);
                        this._authService.removeRepositoryDraft();
                        this.router.navigate([
                            '/projects/repository/repository-list',
                        ]);
                    } else {
                        this.snackBar.errorSnackBar(res.data.message);
                    }
                    this.submitInProcess = false;
                    this.initialLoading = false;
                    if (res.tokenExpire == true) {
                        this._authService.updateAndReload(window.location);
                    }
                },
                (error) => {
                    this.submitInProcess = false;
                    this.snackBar.errorSnackBar('Internal Server Error');
                }
            );
        }
    }
    downloadYmlFile() {
        let filePath =
            'https://metrics-sproutops-bucket.s3.ap-south-1.amazonaws.com' +
            '/templates/' +
            this.formType +
            '.yml';
        var a = document.createElement('a');
        a.href = filePath; //URL FOR DOWNLOADING
        a.download = this.formType + '.yml';
        a.click();
    }
    sendEmail() {
        const dialogRef = this.dialog.open(SendMailComponent, {
            disableClose: true,
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                repositoryName: this.bitbucketRepositoryName,
                projectName: this.createBitbucketProjectFrom.value.projectName,
                technologyName: this.formType,
                attachmentUrl: this.formType,
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result.result == 'success') {
            }
        });
    }

    onClick(event) {
        if (this.fileUpload) this.fileUpload.nativeElement.click();
    }
    uploadChange({ target }: any) {
        this.uploadInProcess = true;
        if (target.files[0]) {
            let file = target.files[0];
            let extension = file.name
                .substring(file.name.lastIndexOf('.') + 1)
                .toLowerCase();
            let payload = {
                fileName: file.name,
            };
            this._uploadService
                .getPreSignedURL(payload)
                .subscribe((res: any) => {
                    const preSignedURL = res.data.preSignedURL;
                    if (preSignedURL) {
                        this._uploadService
                            .upload(preSignedURL, file)
                            .subscribe((response: any) => {
                                this.initialLoading = false;
                                this.uploadInProcess = false;
                                this.isFileUploaded = true;
                                this.uploadResourceUrl = res.data.resourceUrl;
                            });
                    } else {
                        this.initialLoading = false;
                        this.uploadInProcess = false;
                    }
                    if (res.tokenExpire == true) {
                        this._authService.updateAndReload(window.location);
                    }
                });
        }
    }
    fetchDraft() {
        const payload = {
            metricsProjectId: this.metricsProjectData.id,
        };
        this.initialLoading = true;
        this.RepositoryService.getDraftRepository(payload).subscribe(
            (res: any) => {
                if (res.data) {
                    this._authService.setRepositoryDraft(res.data);
                    this.draftId = res.data.id;
                    const item =
                        this._authService.getRepositoryDraft().draftData;
                    this.formType = item.technology;
                    this.initializeForm();
                    this.isFormType = true;
                    if (this.formType) {
                        this.changeProject(this.formType);
                        this.createBitbucketProjectFrom.patchValue({
                            bitbucketProjectName: item.bitbucketProjectName
                                ? item.bitbucketProjectName
                                : '',
                            projectName: item.projectName
                                ? item.projectName
                                : '',
                            repositoryName: '',
                            developer: '',
                            codeReviewerAndPm: '',
                            branchOrPattern: '',
                        });
                    }
                    this.repositories = item.repoNames;
                    this.branches = item.branchName;
                    this.developers = item.email;
                    this.codeReviewers = item.codeReviewer;
                    if (item.portal.length > 0) {
                        this.portalNameOrMicroserviceNames = item.portal;
                        this.createBitbucketProjectFrom.patchValue({
                            portalNameOrMicroserviceName: '',
                        });
                        this.isRepository = false;
                    }
                    if (item.uploadResourceUrl) {
                        this.uploadResourceUrl = item.uploadResourceUrl;
                        this.isFileUploaded = true;
                    }
                    this.isFileUploaded = true;
                    this.selectedIndex = 2;
                    this.showStep = 3;
                } else {
                    this.initializeForm();
                }
                this.initialLoading = false;
                if (res.tokenExpire == true) {
                    this._authService.updateAndReload(window.location);
                }
            }
        );
    }
    saveAsDraft() {
        const payload = {
            draftData: {
                bitbucketProjectName: this.bitbucketRepositoryName,
                projectName: this.createBitbucketProjectFrom.value.projectName,
                repoNames: this.repositories,
                branchName: this.branches,
                email: this.developers,
                codeReviewer: this.codeReviewers,
                portal: this.portalNameOrMicroserviceNames,
                uploadResourceUrl: this.uploadResourceUrl,
                technology: this.formType,
            },
            metricsProjectId: this.metricsProjectData.id,
            id: this.draftId,
        };
        this.RepositoryService.saveAsDraftRepository(payload).subscribe(
            (res: any) => {
                if (!res.error) {
                    this.snackBar.successSnackBar(res.message);
                    this.router.navigate([
                        '/projects/repository/repository-list',
                    ]);
                } else {
                    this.snackBar.errorSnackBar(res.data.message);
                }
                this.initialLoading = false;
                if (res.tokenExpire == true) {
                    this._authService.updateAndReload(window.location);
                }
            }
        );
    }
    deleteURL() {
        this.uploadResourceUrl = '';
    }
}