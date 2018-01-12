import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ServerService } from './../../server.service';


@Component({
    selector: 'ensemble-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupFormComponent {

    constructor(private server: ServerService){}

    onSignupSubmit(form: NgForm){
       console.log(form);
       this.server.signupUser(form)
           .subscribe(
               (response) => console.log(response),
               (error) => console.log(error)
           );
    }
}