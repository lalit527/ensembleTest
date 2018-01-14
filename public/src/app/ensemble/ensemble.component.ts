import { Component } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-ensemble',
    templateUrl: './ensemble.component.html',
    styleUrls: ['./ensemble.component.css']
})

export class EnsembleMainComponent {
    constructor(private _router: Router){

    }
    showDashboard() {
        this._router.navigate(['dashboard']);
    }
}