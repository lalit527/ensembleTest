import { Component, ViewChild, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { ServerService } from './../../server.service';
import { LoginService } from "./loginfb.service";

@Component({
    selector: 'ensemble-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
    loginForm: FormGroup;
    constructor(private server: ServerService, private userService: LoginService){}

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
            (response) => console.log(response),
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


}