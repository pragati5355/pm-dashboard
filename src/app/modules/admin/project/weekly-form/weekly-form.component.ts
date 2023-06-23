import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@services/auth/auth.service';
import { SnackBar } from 'app/core/utils/snackBar';
import { WeeklyStatusService } from '../common/services/weekly-status.service';

@Component({
  selector: 'app-weekly-form',
  templateUrl: './weekly-form.component.html',
  styleUrls: ['./weekly-form.component.scss']
})
export class WeeklyFormComponent implements OnInit {

  formData: any;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<WeeklyFormComponent>,
    private weeklyStatuService: WeeklyStatusService,
    private snackBar: SnackBar,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.matDialogRef.close('close');
  }
}
