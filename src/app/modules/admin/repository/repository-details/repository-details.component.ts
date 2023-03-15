import {
    Component,
    OnInit,
    ViewEncapsulation,
    Inject,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl } from '@angular/forms';
import { SnackBar } from '../../../../core/utils/snackBar';
import { ValidationConstants } from '../../../../core/constacts/constacts';
import {
    TextRegexValidator,
    RegexConstants,
    noWhitespaceValidator,
} from '../../../../core/utils/Validations';
import { RepositoryService } from '@modules/admin/repository/common/services/repository.service';
import { ErrorMessage } from 'app/core/constacts/constacts';
export interface DialogData {
    resend: any;
}

@Component({
    selector: 'app-repository-details',
    templateUrl: './repository-details.component.html',
    styleUrls: ['./repository-details.component.scss'],
})
export class RepositoryDetailsComponent implements OnInit {
    repoData: any;
    constructor(
        private snackBar: SnackBar,
        public matDialogRef: MatDialogRef<RepositoryDetailsComponent>,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private RepositoryService: RepositoryService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.repoData = this.data;
    }

    close() {
        this.matDialogRef.close();
    }
}
