import { Component,OnInit } from "@angular/core";
import { FormGroup,FormBuilder } from "@angular/forms";


@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComplonent implements OnInit {
    showMsg: boolean = false;
    forgotPswdForm:FormGroup;
    constructor(private formBuilder: FormBuilder){}
    ngOnInit(){
        this.forgotPswdForm = this.formBuilder.group({
            email: ''
        })
    }
    submitEmail(){
        this.showMsg = true;
    }
}
