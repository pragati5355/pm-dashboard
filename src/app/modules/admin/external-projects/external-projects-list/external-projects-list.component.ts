import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ExternalProjectsAddResourceComponent } from '../external-projects-add-resource/external-projects-add-resource.component';
import { ExternalProjectsApiService } from '../common/services/external-projects-api.service';
import { AuthService } from '@services/auth/auth.service';
import { CreateExternalProjectComponent } from '../create-external-project/create-external-project.component';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-external-projects-list',
    templateUrl: './external-projects-list.component.html',
    styleUrls: ['./external-projects-list.component.scss'],
})
export class ExternalProjectsListComponent implements OnInit {
    developerEmailList: any[];
    isLoadingDeveloperEmails: boolean = false;
    projectList = [];
    filteredProjectList = [];
    searchControl = new FormControl();

    initialLoading: boolean = false;
    constructor(
        private router: Router,
        private matDialog: MatDialog,
        private externalProjectsService: ExternalProjectsApiService,
        private _authService: AuthService
    ) {}

    ngOnInit(): void {
        this.addSearchListener();
        this.loadExternalProjectsList();
        this.loadDeveloperEmailList();
    }

    addSearchListener() {
        this.searchControl?.valueChanges.subscribe((searchKey: string) => {
            searchKey = searchKey?.trim();
            if (searchKey) {
            } else {
                this.filteredProjectList = this.projectList;
            }
        });
    }

    loadDeveloperEmailList() {
        this.isLoadingDeveloperEmails = true;
        this.externalProjectsService.findAllDeveloperEmails().subscribe(
            (res: any) => {
                this.isLoadingDeveloperEmails = false;
                if (res?.data) {
                    this.developerEmailList = res?.data;
                }
            },
            (err) => {
                this.isLoadingDeveloperEmails = false;
            }
        );
    }

    addNew() {
        this.matDialog
            .open(CreateExternalProjectComponent, {
                width: '60%',
                height: 'auto',
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    window.location.reload();
                }
            });
    }

    goToExternalProjectDetails(id: number) {
        this.router.navigate([`/external-projects/details/${id}`]);
    }

    openDialog(projectId, team: any) {
        const filteredEmailList = this.filterOutAlreadyAssignedEmails(team);
        this.matDialog
            .open(ExternalProjectsAddResourceComponent, {
                disableClose: true,
                width: '50%',
                panelClass: 'warn-dialog-content',
                autoFocus: false,
                data: {
                    developerEmails: filteredEmailList,
                    allResources: this.developerEmailList,
                    projectId,
                },
            })
            .afterClosed()
            .subscribe((result: any) => {
                if (result) {
                    window.location.reload();
                }
            });
    }

    private filterOutAlreadyAssignedEmails(team: any) {
        return this.developerEmailList.filter(
            (obj) => !team?.some(({ email }) => obj.email === email)
        );
    }

    private loadExternalProjectsList() {
        this.initialLoading = true;
        this.externalProjectsService.getExternalProjectsList().subscribe(
            (res: any) => {
                this.initialLoading = false;
                if (res?.error === false) {
                    this.projectList = res?.data;
                    this.filteredProjectList = res?.data;
                }
                if (res?.tokenExpire) {
                    this._authService.updateAndReload(window.location);
                }
            },
            (err) => {
                this.initialLoading = false;
            }
        );
    }
}
