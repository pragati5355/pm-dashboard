import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedInUserService } from '@modules/admin/common/services/logged-in-user.service';
import { SnackBar } from 'app/core/utils/snackBar';
import { MenteeService } from '../common/services/mentee.service';

@Component({
    selector: 'app-add-form',
    templateUrl: './add-form.component.html',
    styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {
    public form!: Object;
    preFillFormData: any;
    isLoading: boolean = false;
    loggedInUser: any;
    resourceId: number | null = null;
    initialLoading: boolean = false;
    menteeDetails: any;
    constructor(
        private router: Router,
        private loggedInUserService: LoggedInUserService,
        private snackBar: SnackBar,
        private menteeService: MenteeService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.addRouteSubscription();
        this.getUserRole();
    }

    goBack() {
        this.router.navigate([`/mentee/form-list/${this.resourceId}`]);
    }

    submit(event: any) {
        this.isLoading = true;
        const formData = {
            ...event?.data,
        };
        const payload = {
            resourceId: this.resourceId,
            mentorId: this.loggedInUser?.resourceId,
            formData: this.getSectionWiseObjects(formData),
            team: formData?.['team'],
            reviewerEmail: formData?.['reviewerEmail'],
            employeeEmail: formData?.['employeeEmail'],
            awardDescription: {
                mentionYourAdditionalComments:
                    formData?.mentionYourAdditionalComments,
                considerForAward: formData?.considerForAward,
                awardType: formData?.awardType,
                considerForAwardComments: formData?.considerForAwardComments,
            },
            reviewMonth: formData?.['basicDetailsHalfTable-reviewMonth'],
        };

        this.menteeService.saveOneToOneForm(payload).subscribe(
            (res: any) => {
                if (res?.code === 200) {
                    this.snackBar.successSnackBar(res?.message);
                    this.router.navigate([
                        `/mentee/form-list/${this.resourceId}`,
                    ]);
                }
            },
            (err) => {
                this.snackBar.errorSnackBar('Something went wrong');
            }
        );
    }

    loadMenteeData(id: string | number) {
        const payload = { id };
        this.initialLoading = true;
        this.menteeService.getMenteeDetailsById(payload).subscribe(
            (res: any) => {
                this.initialLoading = false;
                if (res.data) {
                    this.menteeDetails = res?.data;
                    this.getOneToOneForm();
                }
            },
            (error) => {
                this.initialLoading = false;
            }
        );
    }

    private addRouteSubscription() {
        this.route.paramMap.subscribe((paramMap) => {
            const resourceId = paramMap.get('id');
            if (resourceId) {
                this.resourceId = Number(resourceId);
            }
        });
    }

    private getUserRole() {
        this.isLoading = true;
        this.loggedInUserService.getLoggedInUser().subscribe(
            (res: any) => {
                this.isLoading = false;
                if (res?.role) {
                    this.loggedInUser = res;
                    this.loadMenteeData(this.resourceId);
                }
            },
            (err) => {
                this.isLoading = false;
                this.snackBar.errorSnackBar('Something went wrong');
            }
        );
    }
    private getSectionWiseObjects(formData: any) {
        const json = formData;
        // console.log(json);
        let data = {};

        Object.keys(json)?.map((item, idx) => {
            let keyValue = item.split('-');
            let key = keyValue[0];
            let value = keyValue[1];
            if (!(key in data)) {
                data[key] = [];
                if (value) {
                    data[key].push({ [value]: json[item] });
                }
            } else {
                data[key].push({ [value]: json[item] });
            }
        });
        return data;
    }
    private getCurrentMonthName(): string {
        var monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];

        var d = new Date();
        return monthNames[d.getMonth()];
    }
    private getOneToOneForm() {
        const payload = {
            formType: 'ONE_TO_ONE',
        };
        this.menteeService.getFormByType(payload).subscribe((res: any) => {
            if (res?.data) {
                this.form = res?.data?.formComponent;
                this.preFillFormData = {
                    data: {
                        'basicDetailsHalfTable-reviewerName':
                            this.loggedInUser?.firstName +
                            ' ' +
                            this.loggedInUser?.lastName,
                        reviewerEmail: this.loggedInUser?.email,
                        'basicDetailsHalfTable-employeeName':
                            this.menteeDetails?.firstName +
                            ' ' +
                            this.menteeDetails?.lastName,
                        employeeEmail: this.menteeDetails?.email,
                        'basicDetailsHalfTable-date': `${new Date().getDate()}/${
                            new Date().getMonth() + 1
                        }/${new Date().getFullYear()}`,
                        'basicDetailsHalfTable-reviewMonth':
                            this.getCurrentMonthName(),
                    },
                };
            }
        });
    }
}
