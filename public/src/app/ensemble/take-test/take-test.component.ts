import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SharedServices, QuestionService } from "../../services";
import { TimerComponent } from '../../shared'

@Component({
    selector: 'app-take-test',
    templateUrl: './take-test.component.html',
    styleUrls: ['./take-test.component.css']
})

export class TakeTestComponent implements OnInit {
    errorMsg: any;
    question: any = [];
    subject: string;
    level: string;
    startTime = false;
    userIndex = 0;
    @ViewChild('openBtn') openBtn: ElementRef;
    @ViewChild('dataContainer') dataContainer: ElementRef;
    constructor(private _sharedService: SharedServices, private questionService: QuestionService) { }
    ngOnInit() {
        this.subject = this._sharedService.subject;
        this.level = this._sharedService.level
        this.openBtn.nativeElement.click();
        this.getQuestions();
    }
    
    startTest() {
        this.startTime = true;
    }
    changeIndex(number) {
        let x = this.dataContainer.nativeElement.innerHTML
        console.log('test' + x.substring(294, 301));
        console.log(this.question[this.userIndex].id) ;
        //console.log(this.question[this.userIndex].id) ;
        if (this.userIndex > 0 && number < 0 ||  //index must be greater than 0 at all times
            this.userIndex < this.question.length-1 && number > 0 ) {  //index must be less than length of array
              this.userIndex += number;
               }
    }
    getQuestions() {
        this.questionService.getAllQuestion(this.subject,this.level)
            .subscribe(data => {
                this.question = data.questions;
                console.log(this.question)
                }
            ),
            error =>this.errorMsg = <any> error;
    }
}