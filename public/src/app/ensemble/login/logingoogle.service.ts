import { Injectable,OnInit,AfterViewInit } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import 'rxjs/add/operator/toPromise';
import { ServerService } from './../../services/server.service';
import { SharedServices } from "../../services/shared.service";

declare const gapi:any;
@Injectable()
export class GoogleLoginService implements OnInit, AfterViewInit{

     private clientId:string = '494420535275-5lbvjkaa51fjvbbvtfont14ihsrr516v.apps.googleusercontent.com';
  
      private scope = [
        'profile',
        'email',
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/contacts.readonly',
        'https://www.googleapis.com/auth/admin.directory.user.readonly'
      ].join(' ');

    constructor(private http: AuthHttp, private server: ServerService){
    }
    public auth2: any;
    
    ngOnInit() {
        //gapi.load('client:auth2', this.googleInit)
        
    }

    // public googleInit() {
    //     this.auth2 = gapi.auth2.init({
    //         client_id: '494420535275-5lbvjkaa51fjvbbvtfont14ihsrr516v.apps.googleusercontent.com',
    //         cookiepolicy: 'single_host_origin',
    //         scope: 'profile email'
    //       });
    // }

    public googleInit() {
        let that = this;
        gapi.load('auth2', function () {
          that.auth2 = gapi.auth2.init({
            client_id: that.clientId,
            cookiepolicy: 'single_host_origin',
            scope: that.scope
          });
          that.attachSignin(document.getElementById('googleBtn'));
        });
      }


    

    public attachSignin(element) {
        this.auth2.attachClickHandler(element, {},
          (googleUser) => {
    
            let profile = googleUser.getBasicProfile();
            console.log('Token || ' + googleUser.getAuthResponse().id_token);
            console.log('ID: ' + profile.getId());
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
            //YOUR CODE HERE
    
    
          }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
          });
      }

    googleLogin() {
        this.auth2.signIn().then(
            function(success) {
                console.log(success);
            },
            function(error) {
                // Error occurred
                // console.log(error) to find the reason
            }
        );
    }

    ngAfterViewInit(){
        this.googleInit();
    }
}

