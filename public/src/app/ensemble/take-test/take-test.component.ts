import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SharedServices, QuestionService,ServerService } from "../../services";
import { TimerComponent } from '../../shared'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";


@Component({
    selector: 'app-take-test',
    templateUrl: './take-test.component.html',
    styleUrls: ['./take-test.component.css']
})

export class TakeTestComponent implements OnInit {
    id: any;
    showAnswerModal: boolean = false;
    submit: boolean = false;
    next: boolean = true;
    errorMsg: any;
    question: any = [];
    subject: string;
    level: string;
    startTime = false;
    userIndex = 0;
    optionForm: FormGroup;
    answerDataObj: any;
    answerObjArr = [];
    @ViewChild('openBtn') openBtn: ElementRef;
    @ViewChild('dataContainer') dataContainer: ElementRef;
    constructor(private _sharedService: SharedServices, private questionService: QuestionService, private formBuilder: FormBuilder, private _router:Router, private _server: ServerService) { }
    ngOnInit() {
        this.subject = this._sharedService.subject;
        console.log('12456'+this.subject);
        
        this.level = this._sharedService.level;
        this._sharedService.data = [];
        this._sharedService.id = null;
        this.openBtn.nativeElement.click();
        this.getQuestions();
        
        this.optionForm = this.formBuilder.group({
            options: ''
        });
    }

    startTest() {
        this.startTime = true;
        this._sharedService.id = this.id;
        for(let i =0; i<this.question.length;i++){
            this.answerObjArr.push({
            'optionSelected': '',
            'timeTaken':'',
            'questionId':this.question[i]._id
            })
        }
        this._sharedService.data = this.answerObjArr;
        console.log(this.answerObjArr);
    }
    changeIndex(number) {
        console.log(this.question[this.userIndex].id);
        this.answerDataObj = {
            'optionSelected': this.optionForm.get('options').value,
            'timeTaken':this.dataContainer.nativeElement.innerHTML.substring(294, 301),
            'questionId':this.question[this.userIndex]._id
        };
        for(let i=0;i<this.answerObjArr.length;i++){
            this.answerObjArr.splice(this.userIndex,1,this.answerDataObj);
        }
        this._sharedService.data = this.answerObjArr;
        this.optionForm.reset();
        if (this.userIndex > 0 && number < 0 ||  //index must be greater than 0 at all times
            this.userIndex < this.question.length - 1 && number > 0) {  //index must be less than length of array
            this.userIndex += number;
        }
        console.log("gjkhjkhkjhkjhkjh"+this.userIndex);
        if(this.userIndex == this.question.length-1) {
            this.next = false; 
            this.submit = true;
        }
    }
    submitAnswer(){
        this.answerObjArr.push(
             {
            'optionSelected': this.optionForm.get('options').value,
            'timeTaken':this.dataContainer.nativeElement.innerHTML.substring(294, 301),
            'questionId':this.question[this.userIndex].id
        });
        //this.showAnswerModal = true;
            console.log('checkkk'+this.answerObjArr);
            this._sharedService.data = this.answerObjArr;
        this._router.navigate(['submit-answer'])
    
    }
    getQuestions() {
        this._server.getAllQuestion(this.subject, this.level)
            .subscribe(data => {
               
                if(data.data!==null){
                    this.id = data.data._id;
                    this.question = data.data.questions;
                }
                else {
                    this.question = [];
                }
               
                
                console.log(this.question)
            }
            ),
            error => this.errorMsg = <any>error;
    }
}