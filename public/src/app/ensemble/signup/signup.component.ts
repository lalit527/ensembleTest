import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ServerService } from './../../services/server.service';
import { Router } from "@angular/router";
import { SharedServices } from "../../services/shared.service";



@Component({
    selector: 'ensemble-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupFormComponent {

    constructor(private server: ServerService, private router: Router, private _shared: SharedServices){}

    onSignupSubmit(form: NgForm){
       console.log(form);
       this.server.signupUser(form)
           .subscribe(
               (response) => {
                   var data = response.json();
                   var token = response.headers.get('x-auth-token');
                   localStorage.setItem('x-ensemble-user', JSON.stringify({token:token, user:data.data.name, email: data.data.email}));
                   this._shared.change();
                   this.router.navigate(['/dashboard']);
               },
               (error) => console.log(error)
           );
    }
}