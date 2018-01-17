import { Component,Input, OnInit, ViewChild, ElementRef} from "@angular/core";
import { SharedServices, QuestionService } from "../../services";


@Component({
    selector:'answer-popup',
    templateUrl:'./exam-final-answers.component.html',
    styleUrls:['./exam-final-answers.component.css']
})
export class ExamFinalAnswersComponent implements OnInit{
    qsId: any;
    data : any;
    toSendData:any = {};
@ViewChild('openBtn') openBtn: ElementRef;
constructor(private _sharedService:SharedServices,private questionService: QuestionService){}
ngOnInit(){
    this.data = this._sharedService.data;
    this.qsId = this._sharedService.id;
    this.openBtn.nativeElement.click();
    this.toSendData = {
        'id': this.qsId,
        'data':this.data
    }
    console.log(this._sharedService.data);
}
submitAns(){
    console.log(this.toSendData);
    this.questionService.saveAnswers(this.toSendData)
        .subscribe(
            (response) => {console.log(response)},
            (error) => {console.log(error)}
        );
}
}