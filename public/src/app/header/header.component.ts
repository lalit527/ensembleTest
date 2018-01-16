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
    loggedUser: Object;
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
        this.loggedUser = JSON.parse(localStorage.getItem('x-ensemble-user')) || {};
        if(this.loggedUser.hasOwnProperty('token')){
            this._shared.change(true);
           //this._router.navigate(['/dashboard']);
        }
        console.log('----'+JSON.stringify(this.loggedUser));
    }

    onlogout() {
        console.log('here');
        localStorage.removeItem('x-ensemble-user');
        this._shared.change(false);
        this._router.navigate(['/']);
    }


}