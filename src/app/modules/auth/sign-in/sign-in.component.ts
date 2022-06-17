import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser} from '@abacritt/angularx-social-login';
import { AuthServiceService } from '../../../core/services/AuthService/AuthService.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
      styleUrls: ['./sign-in.component.scss'],
      encapsulation: ViewEncapsulation.None,
      animations   : fuseAnimations
})
export class AuthSignInComponent implements OnInit
{

    alert: { type: FuseAlertType; message: string } = {
      type   : 'success',
      message: ''
  };
  showAlert: boolean = false;
   socialUser!: SocialUser;
   isLoggedin?: boolean;
  
    constructor(private _authService: AuthServiceService,private authService: SocialAuthService,
      private socialAuthService: SocialAuthService,
      private router: Router) { }
  
    ngOnInit(): void {
      this.socialAuthService.authState.subscribe((user) => {
        this.socialUser = user;
        this.isLoggedin = user != null;
      });
    }
    loginWithGoogle(): void {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(res => {
          this.showAlert = false;
          console.log(res);
          this._authService.login(JSON.stringify(res)).subscribe(
              (res:any)=>{
                if (res.status_code === 200 || res.status_code === 201) {
                     console.log(res)
                     this.router.navigate(['/dashboard']) 
                 
                }else{
                    console.log(res);
                  this.alert = {
                      type   : 'error',
                      message: 'Wrong email or password'
                  };
  
                  // Show the alert
                  this.showAlert = true;
                }
              },
              error =>{
                  this.alert = {
                      type   : 'error',
                      message: 'Server network issue'
                  };
  
                  // Show the alert
                  this.showAlert = true;
                 
              }
            )
      }) 
      .catch(error => {
          this.alert = {
              type   : 'error',
              message: 'Something went wrong'
          };
  
          // Show the alert
          this.showAlert = true;
        });
  }
  
  
    logOut(): void {
      this.socialAuthService.signOut().then(() => this.router.navigate(['login']));
    }
  }
  