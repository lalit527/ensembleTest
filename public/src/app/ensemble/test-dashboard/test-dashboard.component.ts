import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedServices } from '../../services';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
    selector: 'test-dashboard',
    templateUrl: './test-dashboard.component.html',
    styleUrls: ['./test-dashboard.component.css']
})

export class TestDashboardComponent implements OnInit {
    takeTest = false;
    level:true;
    subjectForm:FormGroup;
    levelForm:FormGroup;
    levelBtn= false;
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
        if(this.levelForm.get('level').value.value!=''){
            this.levelBtn = false;
        this._sharedService.subject = this.subjectForm.get('subject').value;
        this._sharedService.level = this.levelForm.get('level').value
        this._router.navigate(['take-test']);
    }
    else {
        this.levelBtn = true;
        alert('Please select a Level')
    }
}
    showTestSubjects() {
        this.takeTest = true;
    }
    showLevel(){
        if(this.subjectForm.get('subject').value.value!=''){
            this.level = true;
        }
        else {
            alert('Please select a Subject')
        }
        
    }
}
