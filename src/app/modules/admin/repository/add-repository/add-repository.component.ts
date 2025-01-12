import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import {
    concatMap,
    delay,
    from,
    of,
    Subject,
    Subscription,
    takeUntil,
} from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@services/auth/auth.service';
import { SnackBar } from '../../../../core/utils/snackBar';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { RepositoryService } from '@modules/admin/repository/common/services/repository.service';
import { UploadServiceService } from '@modules/admin/repository/common/services/upload-service.service';
import { SendMailComponent } from '../send-mail/send-mail.component';
import { MessagingService } from '../common/services/messaging.service';
import { CommandLineModel } from '../common/models/command-line-model';
export class Developer {
    constructor(public id: number, public email: string) {}
}
@Component({
    selector: 'app-add-repository',
    templateUrl: './add-repository.component.html',
})
export class AddRepositoryComponent implements OnInit, OnDestroy {
    @ViewChild('stepper', { static: false }) stepper!: MatStepper;
    @ViewChild('drawer') drawer!: MatDrawer;
    @ViewChild('repositoryInput') repositoryInput!: ElementRef;
    @ViewChild('auto', { static: false }) matAutocomplete: any;
    @ViewChild('branchInput') branchInput!: ElementRef;
    @ViewChild('developerInput') developerInput!: ElementRef;
    @ViewChild('codeReviewerInput') codeReviewerInput!: ElementRef;
    @ViewChild('portalNameOrMicroserviceNameInput', { static: false })
    portalNameOrMicroserviceNameInput: ElementRef<HTMLInputElement>;
    @ViewChild('fileUpload') fileUpload: ElementRef;
    createBitbucketProjectFrom!: FormGroup;
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
    branches: any = ['master', 'staging', 'development', 'qa'];
    allBranches: any = ['master', 'staging', 'development', 'qa', 'uat'];
    // developer filter value
    developer = new FormControl();
    filteredDevelopers: Observable<any[]> | undefined;
    developers: any = [];
    allDevelopers: Developer[] = [];
    allNewExternalDevelopers: any = [];
    // code reviewer filter value
    codeReviewerCtrl = new FormControl();
    filteredCodeReviewers: Observable<any[]> | undefined;
    codeReviewers: any = [];
    allCodeReviewers: any = [];
    // bitbucket project field
    bitbucketProjectName = '';
    // portal field
    portalNameOrMicroserviceNames: string[] = [];
    uploadInProcess = false;
    uploadResourceUrl = '';
    isFileUploaded = false;
    metricsProjectData: any;
    draftObj: any;
    draftId = null;
    submitInProcess = false;
    commandLineModel: CommandLineModel;
    subscriptions: Subscription = new Subscription();
    isRepoCreationError: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    get createBitbucketProject(): { [key: string]: AbstractControl } {
        return this.createBitbucketProjectFrom.controls;
    }
    currentPortalType : any;
    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private dialog: MatDialog,
        private router: Router,
        private RepositoryService: RepositoryService,
        private snackBar: SnackBar,
        private _route: ActivatedRoute,
        private _uploadService: UploadServiceService,
        private messageService: MessagingService
    ) {}

    ngOnInit(): void {
        this.setUserData();
        this.setJiraProject();
        this.firebaseMessagingRef();
        this.setDrawerWatcher();
        this.getAllDevelopers();
        this.getCodeReviewer();
        this.initializeData();
    }

    toggle() {
        this.drawerOpened = !this.drawerOpened;
    }

    goBack(stepper: any) {
        if (this.submitInProcess) {
            this.submitInProcess = false;
        }
        if (this.isRepoCreationError) {
            this.isRepoCreationError = false;
        }
        if (this.initialLoading) {
            this.initialLoading = false;
        }

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
        this.changePortalName(name);
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
    addDeveloper(event: MatChipInputEvent): void {
        this.emailInvalid = false;
        this.developer.setValue('');
        this.createBitbucketProjectFrom.get('developer')?.setValue('');
    }

    removeDeveloper(developer: any, selectIndex: any): void {
        this.developers.splice(selectIndex, 1);
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

                this.initialLoading = false;
                this.tokenExpireFun(res);
            }
        );
    }
    //developer filter function end
    // repository filter function start
    createRepositoryList() {
        this.allRepositories = [];
        let projectName =
            this.createBitbucketProjectFrom.value.projectName.toLowerCase();

        if (this.formType == 'react-native') {
            this.allRepositories = [
                projectName + '-' + this.formType.toLowerCase(),
                projectName + '-' + this.formType.toLowerCase() + '-config',
            ];
        }
        if (this.portalNameOrMicroserviceNames.length > 0) {
            this.portalNameOrMicroserviceNames.forEach((item: any) => {
                this.allRepositories.push(
                    projectName +
                        '-' +
                        item.toLowerCase().replace(/\s/g, '-') +
                        '-' +
                        this.formType.toLowerCase()
                );
                this.allRepositories.push(
                    projectName +
                        '-' +
                        item.toLowerCase().replace(/\s/g, '-') +
                        '-' +
                        this.formType.toLowerCase() +
                        '-config'
                );
            });
        }
        this.addRepositoryFilter();
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
        this.createRepositoryList();
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

    // branch filter functions end

    // code reviewer filter function start
    getCodeReviewer() {
        this.RepositoryService.findAllMembers().subscribe((res: any) => {
            res.data.forEach((item: any) => {
                this.allCodeReviewers.push(item.user);
            });

            this.initialLoading = false;
            this.tokenExpireFun(res);
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

    returnFn(bitbucketProject?: any) {
        if (typeof bitbucketProject == 'object') {
            return bitbucketProject ? bitbucketProject.projectName : undefined;
        }
    }

    //bitbucket project filter function end

    // Add portal function

    addPortal(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        this.isRepository = false;
        if ((value || '').trim()) {
            this.portalNameOrMicroserviceNames.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
        this.createRepositoryList();
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
        this.createRepositoryList();
    }

    submitBitbucketProject() {
        if (this.isRepoCreationError) {
            this.isRepoCreationError = false;
        }
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
    submit(status: any) {
        const newCodeReviewers = [];
        this.codeReviewers.forEach((items) => {
            newCodeReviewers.push(items.uuid);
        });
        if (!this.createBitbucketProjectFrom.invalid) {
            this.submitInProcess = true;
            const payload = {
                metadata: {
                    bitbucketProjectName: this.bitbucketRepositoryName,
                    projectName:
                        this.createBitbucketProjectFrom.value.projectName,
                    repoNames: this.repositories,
                    branchName: this.branches,
                    email: this.developers,
                    codeReviewer: this.codeReviewers,
                    mergeAccessUserUUIDs: newCodeReviewers,
                    portal: this.portalNameOrMicroserviceNames,
                    scriptUrl: this.uploadResourceUrl,
                    projectKey: this.metricsProjectData.repoProject.key,
                    technology: this.formType,
                    metricsProjectId: this.metricsProjectData.id,
                },
                draftId: this.draftId,
                status: status,
            };
            this.RepositoryService.create(payload).subscribe(
                (res: any) => {
                    if (!res.error) {
                        this.snackBar.successSnackBar(res.message);
                        // this.router.navigate(['/projects/repository/list']);
                    } else {
                        this.snackBar.errorSnackBar(res.data.message);
                    }
                    this.tokenExpireFun(res);
                },
                (error) => {
                    this.isRepoCreationError = true;
                    this.initialLoading = false;
                    if (error.error.message) {
                        this.snackBar.errorSnackBar(error.error.message);
                    } else {
                        this.snackBar.errorSnackBar(error.error.error);
                    }
                }
            );
        }
    }
    downloadYmlFile() {
        const filePath =
            this._uploadService.downloadFileURL +
            '/templates/' +
            this.formType +
            '.yml';

        fetch(filePath)
            .then((response) => response.blob())
            .then((blob) => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                if (this.repositories?.length > 0) {
                    link.download = this.repositories[0] + '.yml';
                } else {
                    link.download = this.formType + '.yml';
                }
                link.click();
            })
            .catch();
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
            if (result?.result == 'success') {
            }
        });
    }

    onClick(event) {
        if (this.fileUpload) this.fileUpload.nativeElement.click();
    }
    uploadChange({ target }: any) {
        this.uploadInProcess = true;
        if (target.files[0]) {
            const file = target.files[0];
            const payload = {
                fileName: this.repositories[0] + '.yml',
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
                    this.tokenExpireFun(res);
                });
        }
    }
    fetchDraft() {
        const payload = {
            id: this.draftId,
        };
        this.initialLoading = true;
        this.RepositoryService.getDraftRepository(payload).subscribe(
            (res: any) => {
                if (res.data) {
                    const item = res.data.metadata;
                    this.formType = item.technology;
                    this.initializeForm();
                    this.isFormType = true;
                    if (this.formType) {
                        this.createRepositoryList();
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
                    if (item.scriptUrl) {
                        this.uploadResourceUrl = item.scriptUrl;
                        this.isFileUploaded = true;
                    }
                    this.isFileUploaded = true;
                    this.selectedIndex = 2;
                    this.showStep = 3;
                } else {
                    this.initializeForm();
                }
                this.initialLoading = false;
                this.tokenExpireFun(res);
            }
        );
    }
    deleteURL() {
        this.fileUpload.nativeElement.value = '';
        this.uploadResourceUrl = '';
    }

    goBackWindow() {
        window.history.back();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private firebaseMessagingRef() {
        const messageSubscription = this.messageService
            .getMessage(this.metricsProjectData?.repoProject?.key)
            .subscribe((commandLineModel) => {
                if (commandLineModel.error) {
                    this.isRepoCreationError =
                        commandLineModel.error && commandLineModel.completed;
                }
                this.commandLineModel = commandLineModel;
            });

        this.subscriptions.add(messageSubscription);
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
            projectName: [
                this.jiraProjectName,
                [
                    Validators.required,
                    Validators.pattern(
                        ValidationConstants.WHITESPACE_VALIDATION
                    ),
                ],
            ],
            repositoryName: [[], this.validateChipField],
            developer: [[], this.validateChipField],
            codeReviewerAndPm: [[], this.validateChipField],
            branchOrPattern: [this.branches, this.validateChipField],
        });
        if (
            this.formType == 'angular' ||
            this.formType == 'react-js' ||
            this.formType == 'django' ||
            this.formType == 'java' ||
            this.formType == 'android-kotlin' ||
            this.formType == 'ios' ||
            this.formType == 'android-java' ||
            this.formType == 'node-js'
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
        this.addBranchFilter();
        this.addDeveloperFilter();
        this.addCodeReviewerFilter();
    }

    private setDrawerWatcher() {
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                if (matchingAliases.includes('md')) {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                } else {
                    this.drawerMode = 'side';
                    this.drawerOpened = false;
                }
            });
    }
    private addCodeReviewerFilter() {
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
    }
    private _filterCodeReviewer(value: any) {
        if (typeof value == 'object') {
            return this.allCodeReviewers;
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
    private _filterCodeReviewerSlice() {
        return this.allCodeReviewers.filter(
            (allCodeReviewers: any) =>
                !this.codeReviewers.includes(allCodeReviewers)
        );
    }
    private addDeveloperFilter() {
        this.filteredDevelopers = this.createBitbucketProjectFrom
            .get('developer')
            ?.valueChanges.pipe(
                startWith(''),
                map((developer: any) =>
                    developer
                        ? this._filterDevelopers(developer)
                        : this._filterDevelopersSlice()
                )
            );
    }

    private _filterDevelopers(value: any) {
        if (typeof value == 'object') {
            return this.allDevelopers;
        } else {
            const filterValue = value?.toLowerCase();
            return this.allDevelopers.filter(
                (developer: any) =>
                    developer.email?.toLowerCase().indexOf(filterValue) === 0 &&
                    !this.developers.includes(developer.email)
            );
        }
    }

    private _filterDevelopersSlice() {
        this.emailInvalid = false;
        return this.allDevelopers.filter(
            (allDevelopers) => !this.developers.includes(allDevelopers.email)
        );
    }
    private addBranchFilter() {
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

    private _filterBranch(value: string) {
        if (typeof value == 'object') {
            return this.allBranches;
        } else {
            const filterValue = value?.toLowerCase();
            return this.allBranches.filter(
                (branch: any) =>
                    branch?.toLowerCase().indexOf(filterValue) === 0 &&
                    !this.branches.includes(branch)
            );
        }
    }
    private _filterBranchSlice() {
        return this.allBranches.filter(
            (allBranches: any) => !this.branches.includes(allBranches)
        );
    }

    private addRepositoryFilter() {
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

    private _filterRepository(value: string): string[] {
        if (typeof value == 'object') {
            return this.allRepositories;
        } else {
            const filterValue = value?.toLowerCase();

            return this.allRepositories.filter(
                (repository: any) =>
                    repository?.toLowerCase().indexOf(filterValue) === 0 &&
                    !this.repositories.includes(repository)
            );
        }
    }

    private _filterRepositoriesSlice() {
        return this.allRepositories.filter(
            (allRepositories: any) =>
                !this.repositories.includes(allRepositories)
        );
    }

    private validateChipField(validateChipField: FormControl) {
        if (validateChipField.value && validateChipField.value.length === 0) {
            return {
                validateChipFieldArray: { valid: false },
            };
        }
        return null;
    }

    private tokenExpireFun(res: any) {
        if (res.tokenExpire == true) {
            this._authService.updateAndReload(window.location);
        }
    }

    private initializeData() {
        this.routeSubscribe = this._route.queryParams.subscribe((res) => {
            if (res['id']) {
                this.draftId = res['id'];
                this.fetchDraft();
            }
        });
    }
    changePortalName(name) {
        if (name == 'angular' || name == 'react-js' || name == 'node-js') {
            this.currentPortalType = 'portal';
        } else if (name == 'django' || name == 'java') {
            this.currentPortalType = 'microservice';
        } else if (
            name == 'android-kotlin' ||
            name == 'ios' ||
            name == 'android-java'
        ) {
            this.currentPortalType = 'app';
        }
    }
}
