import {Component,Injectable,OnInit, OnDestroy,Input,Output,EventEmitter} from '@angular/core'
import {  } from '@angular/core/src/metadata/lifecycle_hooks';
@Injectable()
export class SharedServices implements OnInit,OnDestroy{
    @Output() fire: EventEmitter<any> = new EventEmitter();
    public subject:any;
    public level:any;
    public data = [];
    public id: any;
    ngOnInit(){}
    ngOnDestroy(){
        this.subject = null;
        this.level = null;
        this.data = null;
        this.id = null;
    }

    change(value) {
        console.log('change started'); 
        this.fire.emit(value);
    }

    getEmittedValue() {
        return this.fire;
    }
    
}