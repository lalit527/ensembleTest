import { Component, Injectable } from "@angular/core";
import { CanActivate,Router } from "@angular/router";
import { SharedServices } from "../../services";

@Injectable()
export class TestGuardComponent implements CanActivate {
   constructor(private _sharedService:SharedServices, private route:Router){}
   canActivate() {
       if(this._sharedService.subject!=null && this._sharedService.level!=null) {
            return true;
       }
       else {
            this.route.navigate(['test-dashboard']);
       }
   }
}