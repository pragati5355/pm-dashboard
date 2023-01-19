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
import { RepositoryService } from '@services/repository.service';
import { SnackBar } from '../../../../core/utils/snackBar';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {
    MatAutocompleteSelectedEvent,
    MatAutocomplete,
} from '@angular/material/autocomplete';
import { BitbucketProjectModel } from '../common/models/bitbucket-project.model';
export class Developer {
    constructor(public id: number, public email: string) {}
}
@Component({
    selector: 'app-add-repository',
    templateUrl: './add-repository.component.html',
    styleUrls: ['./add-repository.component.scss'],
})
export class AddRepositoryComponent implements OnInit {
    pageTitle = 'add';
    @ViewChild('stepper', { static: false }) stepper!: MatStepper;
    @ViewChild('drawer') drawer!: MatDrawer;
    selectedIndex = 0;
    showStep = 1;
    initialLoading: boolean = false;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    jiraProjectName = '';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    routeSubscribe: any;
    userData: any;
    createBitbucketProjectFrom!: FormGroup;
    angularForm!: FormGroup;
    emailInvalid = false;
    formType: any = '';
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = false;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    //  repository filter value
    addOnBlurRepository = false;
    filteredRepositories!: Observable<any[]> | undefined;
    repositories: any = [];
    allRepositories: any = [];

    @ViewChild('repositoryInput')
    repositoryInput!: ElementRef;
    @ViewChild('auto', { static: false }) matAutocomplete:
        | MatAutocomplete
        | any;
    //branch filter value
    addOnBlurBranch = false;
    filteredBranches: Observable<any[]> | undefined;
    branches: any = ['master', 'staging', 'development'];
    allBranches: any = ['master', 'staging', 'development', 'testing'];

    @ViewChild('branchInput')
    branchInput!: ElementRef;
    // developer filter value
    developer = new FormControl();
    filteredDevelopers: Observable<any[]> | undefined;
    developers: any = [];
    allDevelopers: Developer[] = [];
    @ViewChild('developerInput')
    developerInput!: ElementRef;
    newExternalDeveloper: any = [];
    allNewExternalDevelopers: any = [];
    newExternalDevelopersEmail: any = [];
    // code reviewer filter value
    codeReviewerCtrl = new FormControl();
    filteredCodeReviewers: Observable<any[]> | undefined;
    codeReviewers: any = [];
    allCodeReviewers: any = [];

    @ViewChild('codeReviewerInput')
    codeReviewerInput!: ElementRef;

    // bitbucket project field
    bitbucketProjectName = '';
    myControl = new FormControl();
    options: BitbucketProjectModel[] = [];
    filteredOptions: Observable<BitbucketProjectModel[]> | any;
    get createBitbucketProject(): { [key: string]: AbstractControl } {
        // console.log(key)
        return this.createBitbucketProjectFrom.controls;
    }
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
        private _route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.userData = this._authService.getUser();
        // Subscribe to media changes
        let projectData = this._authService.getProjectDetails();
        let jiraProjectName = projectData.name.toLowerCase();
        this.jiraProjectName = jiraProjectName.replace(/\s/g, '-');
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

        this.createBitbucketProjectFrom = this._formBuilder.group({
            bitbucketProjectName: ['', [Validators.required]],
            projectName: [this.jiraProjectName, [Validators.required]],
            repositoryName: [[], this.validateChipField],
            developer: [[], this.validateChipField],
            codeReviewerAndPm: [[], this.validateChipField],
            branchOrPattern: [this.branches, this.validateChipField],
        });
        this.getAllDevelopers();
        this.getCodeReviewer();
        this.getBitbucketProjectName();
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
        this.formType = name;
        if (this.formType == 'angular' || this.formType == 'react-js') {
            this.createBitbucketProjectFrom.addControl(
                'portalName',
                new FormControl('', Validators.required)
            );
        }
        if (this.formType == 'django' || this.formType == 'java') {
            this.createBitbucketProjectFrom.addControl(
                'microserviceName',
                new FormControl('', Validators.required)
            );
        }
    }
    //developer filter function start
    _filterDevelopers(value: any) {
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
        if (typeof value == 'string') {
            if (this.validateEmail(value)) {
                this.newExternalDeveloper.push(value);
                let max =
                    Math.max.apply(
                        Math,
                        this.allDevelopers.map((ele) => ele.id)
                    ) + 1;
                this.allDevelopers.push({ id: max, email: event.value });
                this.developers.push(value);
                this.allNewExternalDevelopers.push({
                    id: max,
                    email: event.value,
                });
                this.emailInvalid = false;
                if (input) {
                    input.value = '';
                }

                this.developer.setValue('');
                this.createBitbucketProjectFrom.get('developer')?.setValue('');
            } else {
                this.emailInvalid = true;
            }
        }
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
        this.createBitbucketProjectFrom.get('developer')?.setValue('');
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
        this.allDevelopers = [
            { id: 14, email: 'pranita.jadhav@mindbowser.com' },
            { id: 15, email: 'ashwin.kawade@mindbowser.com' },
            { id: 23, email: 'sanskriti/gupta@mindbower.com' },
        ];
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
    }
    //developer filter function end
    // repository filter function start
    changeProject(event: any) {
        let projectName =
            this.createBitbucketProjectFrom.value.projectName +
            '-' +
            this.formType;
        this.allRepositories = [projectName, projectName + '-config'];
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
        this.createBitbucketProjectFrom.get('branchOrPattern')?.setValue('');
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
        this.RepositoryService.getBitbucketMember().subscribe((res: any) => {
            res.data.forEach((item: any) => {
                this.allCodeReviewers.push(item.user);
            });
            console.log(this.allCodeReviewers);
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
        console.log('codeReviewers', this.codeReviewers);
        // Reset the input value
        if (input) {
            input.value = '';
        }
        this.createBitbucketProjectFrom.get('codeReviewerAndPm')?.setValue('');
    }

    removeCodeReviewer(codeReviewer: any, indx: any) {
        this.codeReviewers.splice(indx, 1);
        this.createBitbucketProjectFrom.get('codeReviewerAndPm')?.setValue('');
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
    // code reviewer filter function end

    //bitbucket project filter function start
    getBitbucketProjectName() {
        let payload = {
            projectName: '',
        };
        this.options = [
            {
                id: 1,
                uuid: '{c154166c-69a3-4384-9696-ed1de7b548b2}',
                projectName: 'ginger10',
                bitbucketProjectName: 'ginger10',
                key: 'GINGER10',
                createdAt: '2021-11-18T10:42:44.376',
                createdBy: 'Pranita',
                bitbucketUrl: 'GINGER10',
                jenkinsUrl: null,
                status: 'success',
            },
            {
                id: 2,
                uuid: '{261831a9-e754-4f42-b5a7-52e1595407e9}',
                projectName: 'taj',
                bitbucketProjectName: 'taj',
                key: 'TAJ',
                createdAt: '2021-11-18T10:44:57.509',
                createdBy: 'Pranita',
                bitbucketUrl: 'TAJ',
                jenkinsUrl: null,
                status: 'success',
            },
            {
                id: 3,
                uuid: '{b56f57d9-721e-442c-96dd-220a6d54f38d}',
                projectName: 'taj1',
                bitbucketProjectName: 'taj1',
                key: 'TAJ1',
                createdAt: '2021-11-18T10:48:52.709',
                createdBy: 'Pranita',
                bitbucketUrl: 'TAJ1',
                jenkinsUrl: null,
                status: 'success',
            },
            {
                id: 4,
                uuid: '{b1e598a2-d90f-420c-bd74-263acc483039}',
                projectName: 'taj10',
                bitbucketProjectName: 'taj10',
                key: 'TAJ10',
                createdAt: '2021-11-18T11:00:40.938',
                createdBy: 'Pranita',
                bitbucketUrl: 'TAJ10',
                jenkinsUrl: null,
                status: 'success',
            },
            {
                id: 5,
                uuid: '{05bd2fc4-70d8-485a-acab-98ce768f396b}',
                projectName: 'taj12',
                bitbucketProjectName: 'taj12',
                key: 'TAJ12',
                createdAt: '2021-11-18T06:00:01.716',
                createdBy: 'Pranita',
                bitbucketUrl: 'TAJ12',
                jenkinsUrl: null,
                status: 'success',
            },
            {
                id: 6,
                uuid: '{4d04d960-4708-4814-ae2c-e99827fddf23}',
                projectName: 'js',
                bitbucketProjectName: 'js',
                key: 'JS',
                createdAt: '2021-11-18T12:11:54.772',
                createdBy: 'Pranita',
                bitbucketUrl: 'JS',
                jenkinsUrl: null,
                status: 'success',
            },
            {
                id: 7,
                uuid: '{5837d2d2-3276-45cd-b458-5f17170e541c}',
                projectName: 'indbowser',
                bitbucketProjectName: 'ginger13',
                key: 'GINGER13',
                createdAt: '2021-11-18T08:18:12.92',
                createdBy: 'Pranita',
                bitbucketUrl: 'GINGER13',
                jenkinsUrl: null,
                status: 'success',
            },
            {
                id: 14,
                uuid: '{2442423b-7eb6-4840-a43b-2ae1df0026d5}',
                projectName: 'bitbucketProject app',
                bitbucketProjectName: 'Test28',
                key: 'TEST28',
                createdAt: '2022-12-28T07:34:35.057',
                createdBy: 'Pranita',
                bitbucketUrl: 'TEST28',
                jenkinsUrl: null,
                status: 'success',
            },
            {
                id: 15,
                uuid: '{22478f83-d3a6-4c3d-95cf-cb5683d5bb57}',
                projectName: 'fgfgd',
                bitbucketProjectName: 'fgf',
                key: 'FGF',
                createdAt: '2023-01-05T09:49:09.289',
                createdBy: 'Pranita',
                bitbucketUrl: 'FGF',
                jenkinsUrl: null,
                status: 'success',
            },
        ];
        this.RepositoryService.getBitbucketProjectName(payload).subscribe(
            (res: any) => {
                // this.options = res.data
                this.initialLoading = false;
                if (res.tokenExpire == true) {
                    this._authService.updateAndReload(window.location);
                }
            }
        );
        this.filteredOptions = this.createBitbucketProjectFrom
            .get('bitbucketProjectName')
            ?.valueChanges.pipe(
                startWith(''),
                map((value) =>
                    typeof value === 'string' ? value : value.projectName
                ),
                map((projectName) =>
                    projectName
                        ? this._filter(projectName)
                        : this.options.slice()
                )
            );
    }
    displayFn(bitbucketProject: any) {
        if (typeof bitbucketProject == 'object') {
            return bitbucketProject ? bitbucketProject.projectName : undefined;
        }
    }
    returnFn(bitbucketProject?: any) {
        if (typeof bitbucketProject == 'object') {
            return bitbucketProject ? bitbucketProject.projectName : undefined;
        }
    }

    private _filter(projectName: string): BitbucketProjectModel[] {
        console.log(projectName);
        const filterValue = projectName.toLowerCase();

        return this.options.filter(
            (option) =>
                option.projectName.toLowerCase().indexOf(filterValue) === 0
        );
    }
    //bitbucket project filter function end
    submit() {
        console.log('invalid', this.createBitbucketProjectFrom.invalid);
        if (!this.createBitbucketProjectFrom.invalid) {
            this.selectedIndex = 2;
            this.showStep = 3;
        }
    }
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
}
