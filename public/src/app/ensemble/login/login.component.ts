import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { ServerService } from './../../services/server.service';
import { LoginService } from "./loginfb.service";
import { GoogleLoginService } from "./logingoogle.service";
import { Router } from "@angular/router";
import { SharedServices } from "../../services/shared.service";

declare const gapi:any;

@Component({
    selector: 'ensemble-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, AfterViewInit{
    private clientId:string = '494420535275-5lbvjkaa51fjvbbvtfont14ihsrr516v.apps.googleusercontent.com';
    public auth2: any;
      private scope = [
        'profile',
        'email'
      ].join(' ');
      
    loginForm: FormGroup;
    constructor(private server: ServerService, private userService: LoginService, private router:Router
               , private _shared: SharedServices, private google: GoogleLoginService){}

    ngOnInit() {
        this.loginForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required])
        });
    }

    onLoginSubmit(){
        //console.log(this.loginForm);
        this.server.loginUser(this.loginForm)
        .subscribe(
            (response) => {
                   var data = response.json();
                   var token = response.headers.get('x-auth-token');
                   console.log(data);
                   localStorage.setItem('x-ensemble-user', JSON.stringify({token:token, user:data.data.name, email: data.data.email}));
                   this._shared.change(true);
                   this.router.navigate(['/dashboard']);
            },
            (error) => console.log(error)
        );
    }

    fbLogin() {
        this.userService.fbLogin().then((result) => {
            console.log('User has been logged in'+ JSON.stringify(result));
            //this.router.navigate(['/dashboard']);
        });
        console.log('User has been logged in');
    }

    googleLogin(){
        this.google.googleLogin();
    }

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

    forgotPswd(){
        this.router.navigate(['forgot-password']);
    }

    ngAfterViewInit(){
        this.googleInit();
    }
   

}