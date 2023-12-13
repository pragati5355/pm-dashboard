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
        console.log('form data-->', formData);
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
        };

        console.log(payload);

        // this.menteeService.saveOneToOneForm(payload).subscribe(
        //     (res: any) => {
        //         if (res?.code === 200) {
        //             this.snackBar.successSnackBar(res?.message);
        //             this.router.navigate([
        //                 `/mentee/form-list/${this.resourceId}`,
        //             ]);
        //         }
        //     },
        //     (err) => {
        //         this.snackBar.errorSnackBar('Something went wrong');
        //     }
        // );
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
            'january',
            'february',
            'march',
            'april',
            'may',
            'june',
            'july',
            'august',
            'september',
            'october',
            'november',
            'december',
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
                        'basicDetails-reviewerNameHalfTable':
                            this.loggedInUser?.firstName +
                            ' ' +
                            this.loggedInUser?.lastName,
                        reviewerEmail: this.loggedInUser?.email,
                        'basicDetails-employeeNameHalfTable':
                            this.menteeDetails?.firstName +
                            ' ' +
                            this.menteeDetails?.lastName,
                        employeeEmail: this.menteeDetails?.email,
                        'basicDetails-currentDateHalfTable': `${new Date().getDate()}/${
                            new Date().getMonth() + 1
                        }/${new Date().getFullYear()}`,
                        'basicDetails-reviewMonthHalfTable':
                            this.getCurrentMonthName(),
                        'basicDetails-projectsWorkedOnDuringThisMonthHalfTable':
                            'metrics',
                        team: 'FRONTEND',
                        'quality_code-reviewer': 'Rahul ',
                        'quality_code-CGRating': '4',
                        'quality_code-comments': 'goood',
                        'quality_delivery-timelyDelivery': 'yes',
                        'quality_delivery-deliveryComments':
                            'Please write your comments for delivery, what went well, what went wrong as well as write the planned and actual delivery dates ',
                        'quality_delivery-bugsReportedByClient':
                            'How many bugs were reported',
                        'quality_delivery-commentsOnBugs':
                            'Please write your comments for bugs reported by client.',
                        'process_gitAndPr-prAreRaised': 'yes',
                        'process_gitAndPr-commentsOnRaisingPrAndManualReview':
                            'Please write your comments for raising a PR and manual code/PR review process.',
                        'process_gitAndPr-whatCanBeDoneBetterInPrManualReview':
                            'What can be done better in the C',
                        'process_jiraOrOtherPmTools-hasJiraOrSimilarPmToolIsUsed':
                            'yes',
                        'process_jiraOrOtherPmTools-commentsOnUsingJiraOrSimilarTool':
                            'Has the dev been using JIRA (or other project management tools) for daily task status and work logs? ',
                        'process_ciCd-hasAllBuildsSharedByCiCd': 'yes',
                        'process_ciCd-commentsOnNotUsingCiCd':
                            'If builds are not shared via CI/CD, please mention the detailed reason for it.',
                        'goalsAndLearnings_goals-statusOfGoals':
                            'What is the status of their goal',
                        'goalsAndLearnings_goals-commentsOnGoals':
                            'Additional comments about what can be done to complete the goals in time.',
                        'goalsAndLearnings_saturdayLearnings-commentsOnParticipationAndAttendance':
                            'Comments about participation and attending Saturday Learning',
                        'overAllRating-tableTrueRatings': {
                            workTasksTheyCompleted: 'average',
                            proactiveness: 'good',
                            attitudeAndBehavior: 'excellent',
                            dependability: 'excellent',
                        },
                        'overAllRating-comments':
                            'Provide your overall thoughts on areas that you see the dev can improve and ideas explaining how?',
                        mentionYourAdditionalComments:
                            'Mention your additional comments',
                        considerForAward: 'yes',
                        statusForLastMonthActionItems:
                            'Provide status of last months action items and list out action Items for next month. Provide status of last months actions items and plan action items for next month to achieve, whether it terms of learning new framework/writing blog et',
                        submit: true,
                        awardType: 'RISING_STAR',
                        considerForAwardComments: 'good performance novvv222',
                    },
                };
            }
        });
    }
}
