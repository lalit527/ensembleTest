import { Component,OnInit } from "@angular/core";
import { QuestionService } from "../../../../services";
import { Router,ActivatedRoute } from "@angular/router";

@Component({
    templateUrl:'./user-dashboard.component.html',
    styleUrls:['./user-dashboard.component.css']
})
export class UserDashBoardComponent implements OnInit {
    errorMsg: any;
    tableHeaderList:any = [];
    updatedHeaderList:any = [];
    userData:any;
    constructor(private questionService: QuestionService,private router: Router, private route: ActivatedRoute){}
    ngOnInit(){
        this.tableHeaderList = [
            {'name':'Name','id':'userName','link':true},
            {'name':'Account Created On:','id':'createdOn'},
            {'name':'Last Login: ','id':'lastLogin'},
            {'name':'Total Test Taken','id':'total'},
            {'name':'Average','id':'avg'}
        ]
        this.updatedHeaderList = this.tableHeaderList;
        this.getUserInfo();
    }
    getUserInfo() {
        this.questionService.getUserInfo()
            .subscribe(data => {
                this.userData = data;
                console.log(this.userData)
            }),
            error => this.errorMsg = <any>error;
    }
    showUserDetails(id:any){
        let url;
        this.route.parent.url.subscribe((urlPath) => {
             url = urlPath[urlPath.length - 1].path;
         })
        this.router.navigate([url, 'user-details', id]);
    }
}