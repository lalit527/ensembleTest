import { Component,OnInit } from "@angular/core";
import { FormGroup,FormBuilder } from "@angular/forms";


@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComplonent implements OnInit {
    showMsg: boolean = false;
    resetPswdForm:FormGroup;
    constructor(private formBuilder: FormBuilder){}
    ngOnInit(){
        this.resetPswdForm = this.formBuilder.group({
            newPswd: '',
            rePswd :''
        })
    }
    submitEmail(){
        this.showMsg = true;
    }
}
