import { CanActivate,Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { SharedServices } from "../../services";

@Injectable()
export class SubmitAnswerComponent implements CanActivate{
constructor(private _sharedService:SharedServices, private router:Router){}
    canActivate(){
        if(this._sharedService.data!=null && this._sharedService.id!=null){
        return true;
        }
        else {
            this.router.navigate(['test-dashboard']);
        }
    }
}