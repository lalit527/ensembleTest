
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashBoardComponent {
    constructor(private _router: Router){

    }
    
}