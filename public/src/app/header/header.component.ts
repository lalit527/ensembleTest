import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SharedServices } from './../services/shared.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit{
    isLogged: Boolean = false;
    constructor(private _router: Router, private _shared: SharedServices){}
    showTestDashboard() {
        this._router.navigate(['test-dashboard']);
    }

    ngOnInit(){
        this._shared.getEmittedValue()
            .subscribe(item => {
                this.isLogged=item;
                console.log('here'+item);
            });
    }


}