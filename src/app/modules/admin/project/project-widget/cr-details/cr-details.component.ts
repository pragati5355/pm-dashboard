import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { forEach } from 'lodash';

@Component({
  selector: 'app-cr-details',
  templateUrl: './cr-details.component.html',
  styleUrls: ['./cr-details.component.scss']
})
export class CrDetailsComponent implements OnInit {

  initialLoading : boolean = false;
  resource : any = [];
  resList : any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<CrDetailsComponent>
  ) { }

  ngOnInit(): void {
    this.resource = this.data?.reslist;
    this.resource.forEach(element => {
      let jsonValue;
      try{
        jsonValue = JSON.parse(element?.updatedProjectRes);
        element["parsedUpdatedProjectRes"] = jsonValue;

      }catch{
        console.log("error");
      }
    });
    console.log("JsonValue - > ", this.resource);
  }

  close() {
    this.matDialogRef.close('close');
  }
}
