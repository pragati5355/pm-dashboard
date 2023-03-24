import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser} from '@abacritt/angularx-social-login';
import { AuthService } from '../../../core/services/auth/auth.service';
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
  submitInProcess: boolean = false;
  showAlert: boolean = false;
   socialUser!: SocialUser;
   isLoggedin?: boolean;
  
    constructor(private _authService: AuthService,private authService: SocialAuthService,
      private socialAuthService: SocialAuthService,
      private router: Router) { }
  
    ngOnInit(): void {
      this.socialAuthService.authState.subscribe((user) => {
        this.socialUser = user;
        this.isLoggedin = user != null;
      });
    }
    loginWithGoogle(): void {
      this.submitInProcess = true;
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(result => {
          this.showAlert = false;
          this._authService.login(JSON.stringify(result)).subscribe(
              (res:any)=>{
                this.submitInProcess = false;
                if(res.data.user == null){
                  this.alert = {
                    type   : 'error',
                    message:  'This account does not exist. Contact Admin at vish.s@mindbowser.com'
                };

                // Show the alert
                this.showAlert = true;
                }else{
                  this._authService.setToken(res.data.token.accessToken);
                  this._authService.setRefreshToken(res.data.token.refreshToken);
                  this._authService.setAuthenticated(true);
                  this._authService.setUser(res.data.user);
                  this._authService.setUserPhoto(result.photoUrl)
                  this.router.navigate(['/projects']) 
                }          
                
              },
              error =>{
                this.submitInProcess = false;
                  this.alert = {
                      type   : 'error',
                      message: 'Server network issue'
                  };
                  this.showAlert = true;
                 
              }
            )
      }) 
      .catch(error => {
          console.log(error)
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
  