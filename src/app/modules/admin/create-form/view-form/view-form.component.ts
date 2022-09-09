import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddFormService } from '@services/add-form.service';
@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.scss']
})
export class ViewFormComponent implements OnInit {
  public form!: Object;
  formName = ""
  routeSubscribe: any;
  initialLoading= false
  constructor(
    private formService: AddFormService,
    private _route: ActivatedRoute,
    private router: Router, ) { }
  ngOnInit(): void {
    this.routeSubscribe = this._route.queryParams.subscribe(formtype => {
      if (formtype['id']) {
          this.getFormDetails({id:formtype['id']})
      }
    });
    // let payload = {
    //   id: 9
    // }
    // this.getFormDetails(payload)
    // this.formName ="Demo Form"
    this.form = {"components":[{"label":"Text Field","labelPosition":"top","placeholder":"","description":"","tooltip":"","prefix":"","suffix":"","widget":{"type":"input"},"inputMask":"","displayMask":"","allowMultipleMasks":false,"customClass":"","tabindex":"","autocomplete":"","hidden":false,"hideLabel":false,"showWordCount":false,"showCharCount":false,"mask":false,"autofocus":false,"spellcheck":true,"disabled":false,"tableView":true,"modalEdit":false,"multiple":false,"persistent":true,"inputFormat":"plain","protected":false,"dbIndex":false,"case":"","truncateMultipleSpaces":false,"encrypted":false,"redrawOn":"","clearOnHide":true,"customDefaultValue":"","calculateValue":"","calculateServer":false,"allowCalculateOverride":false,"validateOn":"change","validate":{"required":false,"pattern":"","customMessage":"","custom":"","customPrivate":false,"json":"","minLength":"","maxLength":"","strictDateValidation":false,"multiple":false,"unique":false},"unique":false,"errorLabel":"","errors":"","key":"textField","tags":[],"properties":{},"conditional":{"show":null,"when":null,"eq":"","json":""},"customConditional":"","logic":[],"attributes":{},"overlay":{"style":"","page":"","left":"","top":"","width":"","height":""},"type":"textfield","input":true,"refreshOn":"","dataGridLabel":false,"addons":[],"inputType":"text","id":"ezvre5","defaultValue":null},{"label":"Number","labelPosition":"top","placeholder":"","description":"","tooltip":"","prefix":"","suffix":"","widget":{"type":"input"},"displayMask":"","customClass":"","tabindex":"","autocomplete":"","hidden":false,"hideLabel":false,"mask":false,"autofocus":false,"disabled":false,"tableView":false,"modalEdit":false,"multiple":false,"persistent":true,"delimiter":false,"requireDecimal":false,"inputFormat":"plain","protected":false,"dbIndex":false,"truncateMultipleSpaces":false,"encrypted":false,"redrawOn":"","clearOnHide":true,"customDefaultValue":"","calculateValue":"","calculateServer":false,"allowCalculateOverride":false,"validateOn":"change","validate":{"required":false,"customMessage":"","custom":"","customPrivate":false,"json":"","min":"","max":"","strictDateValidation":false,"multiple":false,"unique":false,"step":"any","integer":""},"errorLabel":"","errors":"","key":"number","tags":[],"properties":{},"conditional":{"show":null,"when":null,"eq":"","json":""},"customConditional":"","logic":[],"attributes":{},"overlay":{"style":"","page":"","left":"","top":"","width":"","height":""},"type":"number","input":true,"unique":false,"refreshOn":"","dataGridLabel":false,"showCharCount":false,"showWordCount":false,"allowMultipleMasks":false,"addons":[],"id":"el9370w","defaultValue":null},{"type":"button","label":"Submit","key":"submit","size":"md","block":false,"action":"submit","disableOnInvalid":true,"theme":"primary","input":true,"placeholder":"","prefix":"","customClass":"","suffix":"","multiple":false,"defaultValue":null,"protected":false,"unique":false,"persistent":false,"hidden":false,"clearOnHide":true,"refreshOn":"","redrawOn":"","tableView":false,"modalEdit":false,"dataGridLabel":true,"labelPosition":"top","description":"","errorLabel":"","tooltip":"","hideLabel":false,"tabindex":"","disabled":false,"autofocus":false,"dbIndex":false,"customDefaultValue":"","calculateValue":"","calculateServer":false,"widget":{"type":"input"},"attributes":{},"validateOn":"change","validate":{"required":false,"custom":"","customPrivate":false,"strictDateValidation":false,"multiple":false,"unique":false},"conditional":{"show":null,"when":null,"eq":""},"overlay":{"style":"","left":"","top":"","width":"","height":""},"allowCalculateOverride":false,"encrypted":false,"showCharCount":false,"showWordCount":false,"properties":{},"allowMultipleMasks":false,"addons":[],"leftIcon":"","rightIcon":"","id":"eakh47f"}]}
  }
   getFormDetails(payload: any){
    this.initialLoading = true;
     this.formService.getFormDetails(payload).subscribe((res: any) =>{
      //  console.log(res.data.form.formComponent)
      //  this.form = res.data.form.formComponent
      this.initialLoading = false;
      let formdata: any = []
      formdata.push(res.data.form)
      // console.log(formdata)
      formdata.forEach((item: any) => {
        this.formName = item.formName
      // this.formDetails.patchValue({
      //   formName:item.formName?item.formName: "",
      // this.form = item.formComponent
      console.log(item.formComponent)
      });
     })
   }
   submit(event: any) {
    // console.log("submit", event);
  }
  gotoforms(){
    this.router.navigate(
        [`/forms/form-list`]
    );
}
}
