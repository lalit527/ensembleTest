import { Component,OnInit } from "@angular/core";
import { QuestionService } from "../../../../services";
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl:'./user-details.component.html',
    styleUrls:['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
    param: any;
    errorMsg: any;
    tableHeaderList:any = [];
    updatedHeaderList:any = [];
    userData:any;
    constructor(private questionService: QuestionService,private route:ActivatedRoute){}
    ngOnInit(){
        this.route.params.subscribe(params => {
            this.param = params['id'];
        });
        this.tableHeaderList = [
            {'name':'Last ExamTaken','id':'lastExam'},
            {'name':'Date Of Exam: ','id':'date'},
            {'name':'Total Marks','id':'totalMarks'},
            {'name':'Time Taken','id':'time'}
        ]
        this.updatedHeaderList = this.tableHeaderList;
        this.getUserDetails();
    }
    getUserDetails() {
        console.log('here'+this.param)
        this.questionService.getUserDetails(this.param)
            .subscribe(data => {
                this.userData = data;
                console.log(this.userData)
            }),
            error => this.errorMsg = <any>error;
    }
}