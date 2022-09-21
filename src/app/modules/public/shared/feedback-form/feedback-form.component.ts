import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddFormService } from '@services/add-form.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html'
})
export class FeedbackFormComponent implements OnInit {
  public form!: Object;
  routeSubscribe: any;
  initialLoading= false
  projectName = "Demo"
  sprintName="UT Sprint"
  constructor(
    private formService: AddFormService,
    private _route: ActivatedRoute,
    private router: Router, ) { }
  ngOnInit(): void {
    this.routeSubscribe = this._route.queryParams.subscribe(formtype => {
      console.log(formtype)
    });
    this.routeSubscribe = this._route.params.subscribe(q => {
      if (q) {
        console.log(q)
      }
    })
    this.form= {"components":[{"label":"Communitcation Rating","labelPosition":"top","placeholder":"","description":"","tooltip":"","prefix":"","suffix":"","widget":{"type":"input"},"displayMask":"","customClass":"","tabindex":"","autocomplete":"","hidden":false,"hideLabel":false,"mask":false,"autofocus":false,"disabled":false,"tableView":false,"modalEdit":false,"multiple":false,"defaultValue":"","persistent":true,"delimiter":false,"requireDecimal":false,"inputFormat":"plain","protected":false,"dbIndex":false,"truncateMultipleSpaces":false,"encrypted":false,"redrawOn":"","clearOnHide":true,"customDefaultValue":"","calculateValue":"","calculateServer":false,"allowCalculateOverride":false,"validateOn":"change","validate":{"required":false,"customMessage":"","custom":"","customPrivate":false,"json":"","min":"","max":"","strictDateValidation":false,"multiple":false,"unique":false,"step":"any","integer":""},"errorLabel":"","errors":"","key":"communitcationRating","tags":[],"properties":{},"conditional":{"show":null,"when":null,"eq":"","json":""},"customConditional":"","logic":[],"attributes":{},"overlay":{"style":"","page":"","left":"","top":"","width":"","height":""},"type":"number","input":true,"unique":false,"refreshOn":"","dataGridLabel":false,"showCharCount":false,"showWordCount":false,"allowMultipleMasks":false,"addons":[],"id":"ebqwor"},{"label":"Understanding Rating","labelPosition":"top","placeholder":"","description":"","tooltip":"","prefix":"","suffix":"","widget":{"type":"input"},"displayMask":"","customClass":"","tabindex":"","autocomplete":"","hidden":false,"hideLabel":false,"mask":false,"autofocus":false,"disabled":false,"tableView":false,"modalEdit":false,"multiple":false,"defaultValue":"","persistent":true,"delimiter":false,"requireDecimal":false,"inputFormat":"plain","protected":false,"dbIndex":false,"truncateMultipleSpaces":false,"encrypted":false,"redrawOn":"","clearOnHide":true,"customDefaultValue":"","calculateValue":"","calculateServer":false,"allowCalculateOverride":false,"validateOn":"change","validate":{"required":false,"customMessage":"","custom":"","customPrivate":false,"json":"","min":"","max":"","strictDateValidation":false,"multiple":false,"unique":false,"step":"any","integer":""},"errorLabel":"","errors":"","key":"understandingRating","tags":[],"properties":{},"conditional":{"show":null,"when":null,"eq":"","json":""},"customConditional":"","logic":[],"attributes":{},"overlay":{"style":"","page":"","left":"","top":"","width":"","height":""},"type":"number","input":true,"unique":false,"refreshOn":"","dataGridLabel":false,"showCharCount":false,"showWordCount":false,"allowMultipleMasks":false,"addons":[],"id":"elyg0x"},{"label":"Technical rating","labelPosition":"top","placeholder":"","description":"","tooltip":"","prefix":"","suffix":"","widget":{"type":"input"},"displayMask":"","customClass":"","tabindex":"","autocomplete":"","hidden":false,"hideLabel":false,"mask":false,"autofocus":false,"disabled":false,"tableView":false,"modalEdit":false,"multiple":false,"defaultValue":"","persistent":true,"delimiter":false,"requireDecimal":false,"inputFormat":"plain","protected":false,"dbIndex":false,"truncateMultipleSpaces":false,"encrypted":false,"redrawOn":"","clearOnHide":true,"customDefaultValue":"","calculateValue":"","calculateServer":false,"allowCalculateOverride":false,"validateOn":"change","validate":{"required":false,"customMessage":"","custom":"","customPrivate":false,"json":"","min":"","max":"","strictDateValidation":false,"multiple":false,"unique":false,"step":"any","integer":""},"errorLabel":"","errors":"","key":"technicalRating","tags":[],"properties":{},"conditional":{"show":null,"when":null,"eq":"","json":""},"customConditional":"","logic":[],"attributes":{},"overlay":{"style":"","page":"","left":"","top":"","width":"","height":""},"type":"number","input":true,"unique":false,"refreshOn":"","dataGridLabel":false,"showCharCount":false,"showWordCount":false,"allowMultipleMasks":false,"addons":[],"id":"e202496"},{"type":"button","label":"Submit","key":"submit","size":"md","block":false,"action":"submit","disableOnInvalid":true,"theme":"primary","input":true,"placeholder":"","prefix":"","customClass":"","suffix":"","multiple":false,"defaultValue":null,"protected":false,"unique":false,"persistent":false,"hidden":false,"clearOnHide":true,"refreshOn":"","redrawOn":"","tableView":false,"modalEdit":false,"dataGridLabel":true,"labelPosition":"top","description":"","errorLabel":"","tooltip":"","hideLabel":false,"tabindex":"","disabled":false,"autofocus":false,"dbIndex":false,"customDefaultValue":"","calculateValue":"","calculateServer":false,"widget":{"type":"input"},"attributes":{},"validateOn":"change","validate":{"required":false,"custom":"","customPrivate":false,"strictDateValidation":false,"multiple":false,"unique":false},"conditional":{"show":null,"when":null,"eq":""},"overlay":{"style":"","left":"","top":"","width":"","height":""},"allowCalculateOverride":false,"encrypted":false,"showCharCount":false,"showWordCount":false,"properties":{},"allowMultipleMasks":false,"addons":[],"leftIcon":"","rightIcon":"","id":"e9tyrp"}]}
  }
   getFormDetails(payload: any){
    this.initialLoading = true;
     this.formService.getFormDetails(payload).subscribe((res: any) =>{

      this.initialLoading = false;
      let formdata: any = []
      formdata.push(res.data)
      formdata.forEach((item: any) => {
        this.form = item.formComponent
      });
     })
   }
   submit(event: any) {
     console.log(event);
  }
}
