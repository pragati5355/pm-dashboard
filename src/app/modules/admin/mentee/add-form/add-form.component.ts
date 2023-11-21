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
        const payload = {
            resourceId: this.resourceId,
            mentorId: this.loggedInUser?.resourceId,
            formData: event?.data,
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
                    this.preFillFormData = {
                        data: {
                            ...this.preFillFormData?.data,
                            reviewerName:
                                this.loggedInUser?.firstName +
                                ' ' +
                                this.loggedInUser?.lastName,
                            reviewerEmail: this.loggedInUser?.email,
                            reviewMonth: `${
                                new Date().getMonth() + 1
                            }/02/${new Date().getFullYear()}`,
                            employeeName: 'Amaresh joshi',
                            employeeEmail: 'amaresh@mindbowser.com',
                            projectsWorkedOnDuringThisMonth: 'TTA',
                            team: 'QA',
                            wasTheWorkAssignedDeliveredOnTime: 'yes',
                            commentsOnDelivery: 'test',
                            haveTheDeveloperBeenRaisingPRsForTheWorkCommit:
                                'yes',
                            commentsOnRaisingPr: '',
                            whatCanBeDoneBetterInTheCodePrReviewProcess: '',
                            devUsingJira: 'yes',
                            pleaseWriteCommentsOnUsingJiraOrOtherProjectManagementTools:
                                '',
                            isDevSharingBuild: '',
                            commentsOnDevNotSharingBuild: '',
                            whatIsTheStatusOfTheirGoals: 'asda',
                            additionalCommentsOnGoals: '',
                            commentsAboutParticipationAndAttendingSaturdayLearning:
                                '',
                            overAllRating: {
                                workTasksTheyCompleted: 'excellent',
                                proactiveness: 'excellent',
                                attitudeAndBehavior: 'excellent',
                                dependability: 'excellent',
                            },
                            overAllThoughtsOnImprovement: '',
                            mentionYourAdditionalComments: '',
                            considerForAward: 'yes',
                            considerForAwardComments: '',
                            statusForLastMonthActionItems: 'test',
                        },
                    };
                    this.loadMenteeData(this.resourceId);
                }
            },
            (err) => {
                this.isLoading = false;
                this.snackBar.errorSnackBar('Something went wrong');
            }
        );
    }
    private getOneToOneForm() {
        const payload = {
            formType: 'ONE_TO_ONE',
        };
        this.menteeService.getFormByType(payload).subscribe((res: any) => {
            if (res?.data) {
                this.form = res?.data?.formComponent;
            }
        });
    }
}
