import { Component, OnInit } from '@angular/core';
import { LoggedInUserService } from '@modules/admin/common/services/logged-in-user.service';
import {
    MAT_SELECT_YEARS,
    MAT_TAB_MONTHS,
} from '@modules/admin/project/project-widget/common/constants';
export interface NomineeList {
    nominatedBy?: string;
    nomineeName?: string;
    nominatedByName?: string;
    nominee?: string;
    nomineeResId?: number;
    reason?: string;
    award?: 'RISING_STAR' | 'SUPER_STAR';
}
export interface UserInterface {
    deleted?: boolean;
    Integer?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    status?: string;
    role?: string;
    resourceId?: number;
}
@Component({
    selector: 'app-nominee-list',
    templateUrl: './nominee-list.component.html',
    styleUrls: ['./nominee-list.component.scss'],
})
export class NomineeListComponent implements OnInit {
    initialLoading: boolean = false;
    loggedInUser: UserInterface;
    matTabList: any[] = MAT_TAB_MONTHS;
    matSelectYears: string[] = MAT_SELECT_YEARS;
    selectedTabIndex: number = 7;
    currentMonth: number;
    currentYear: string = '';
    selectedYear: string = '2020';
    isLoadingDeveloperEmails: boolean = false;
    developerEmailList: any[];
    nomineeList: NomineeList[] = [
        {
            nominatedBy: 'rohan.kadam@mindbowser.com',
            nomineeName: 'Amaresh Joshi',
            nominatedByName: 'Rohan kadam',
            nominee: 'amaresh.joshi@mindbowser.com',
            nomineeResId: 2,
            reason: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium saepe eveniet molestiae, laboriosam quidem cumque animi quas esse, vero voluptas iusto, delectus excepturi similique explicabo corrupti ex. Inventore, sapiente laudantium!',
            award: 'SUPER_STAR',
        },
        {
            nominatedBy: 'pranita.jadhav@mindbowser.com',
            nomineeName: 'Pragati Gawade',
            nominatedByName: 'Pranita Jadhav',
            nominee: 'pragati.gawade@mindbowser.com',
            nomineeResId: 19,
            reason: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium saepe eveniet molestiae, similique explicabo corrupti ex. Inventore, sapiente laudantium!',
            award: 'SUPER_STAR',
        },
    ];
    constructor(private loggedInUserService: LoggedInUserService) {}

    ngOnInit(): void {
        this.getUserRole();
        this.getCurrentMonthAndYear();
    }

    private getUserRole() {
        this.loggedInUserService.getLoggedInUser().subscribe((res: any) => {
            if (res?.role) {
                this.loggedInUser = res;
                this.getNomineeList();
            }
        });
    }

    private getNomineeList() {
        const payload = {
            resourceId: this.loggedInUser?.resourceId,
        };
    }

    private getCurrentMonthAndYear() {
        this.selectedYear = String(new Date().getFullYear());
        this.currentYear = String(new Date().getFullYear());
        this.selectedTabIndex = new Date().getMonth();
        this.currentMonth = new Date().getMonth();
    }
}
