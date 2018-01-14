import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedServices } from '../../services';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    takeTest = false;
    level:true;
    subjectForm:FormGroup;
    levelForm:FormGroup
    constructor(private _router: Router, private _sharedService:SharedServices,private formBuilder:FormBuilder){
    }
    ngOnInit(){
        this.subjectForm = this.formBuilder.group({
            subject:[{value:''}, Validators.required]
        });
        this.levelForm = this.formBuilder.group({
            level:[{value:''}, Validators.required]
        })
    }
    showTest() {
        this._sharedService.subject = this.subjectForm.get('subject').value;
        this._sharedService.level = this.levelForm.get('level').value
        this._router.navigate(['take-test']);
    }
    showTestSubjects() {
        this.takeTest = true;
    }
    showLevel(){
        this.level = true;
    }
}
