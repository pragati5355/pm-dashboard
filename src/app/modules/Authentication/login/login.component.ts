import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { AppConstants } from "../../../core/constacts/constacts";
import { Router } from "@angular/router";
import { GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import { AuthServiceService } from '../../../core/services/AuthService/AuthService.service';
import { fuseAnimations } from '@fuse/animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})

export class LoginComponent implements OnInit {
  public constants: Object = {};
  isLoggedIn = false;
  data: any
 subscribe: any
//  user!: SocialUser;
 isLogin!: boolean; // 
 socialUser!: SocialUser;
 isLoggedin?: boolean;

  constructor(private _authService: AuthServiceService,private authService: SocialAuthService,
    private socialAuthService: SocialAuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.constants = AppConstants;
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
    ///
  }
  loginWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(d => {
        this._authService.login(JSON.stringify(d)).subscribe(
          (res:any)=>{
            if (res.status_code === 200 || res.status_code === 201) {
                 console.log(res)
                 this.router.navigate(['dashboard'])
            }else{

            }
          },
          error =>{

          }
        )
        this.router.navigate(['dashboard']) 
      }
      
      )
      .catch(error => {
        console.log(error);
      });
  }

  logOut(): void {
    this.socialAuthService.signOut().then(() => this.router.navigate(['login']));
  }
}
