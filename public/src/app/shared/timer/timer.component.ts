import { Component, OnInit,OnDestroy  } from '@angular/core';
//import { Observable, Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription'
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Router } from '@angular/router';

@Component({
    selector: 'timer',
    template: `
    <div class='row'>
    <div class='col-md-2 col-md-offset-4'>
    <h3><i class="fa fa-clock-o" aria-hidden="true" style='padding-right: 12px;
    padding-left: 16px;'></i>Time Left: </h3>
      </div>
      <div class='col-md-3'>
      <h1 class='test'>{{(minutesDisplay) && (minutesDisplay <= 59) ? minutesDisplay : '00'}} : {{(secondsDisplay) && (secondsDisplay <= 59) ? secondsDisplay : '00'}}</h1>
      </div>
    </div>
  `
})
export class TimerComponent implements OnInit,OnDestroy  {
    minutesDisplay: number = 0;
    secondsDisplay: number = 0;

    sub: Subscription;
    countDown;
    counter:any = 10;
    constructor(private _router:Router){}
    ngOnInit() {
        //this.startTimer();
        const myObservable = Observable.create((observer: Observer<number>) => {
              setInterval(() => {
                 if(this.counter === -1){
                    observer.complete();
                 }
                 observer.next(this.counter);
              }, 1000);
        });
        this.sub = myObservable.subscribe(
            (data) => {
                --this.counter;
                this.secondsDisplay = this.getSeconds(data);
                this.minutesDisplay = this.getMinutes(data);
               
               
               //console.log(data);
            },
            (error) => {console.log(error)},
            () => {alert('Time Over!!!!!');
            this._router.navigate(['submit-answer']);
        }
        );
    }
    ngOnDestroy(){
        console.log("Destroy timer");
        // unsubscribe here
        this.sub.unsubscribe();

    }
    private getSeconds(ticks: number) {
        return this.pad(ticks % 60);
    }

    private getMinutes(ticks: number) {
         return this.pad((Math.floor(ticks / 60)) );
    }

    private pad(digit: any) { 
        return digit <= 9 ? '0' + digit : digit;
    }
}