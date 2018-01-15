import {Injectable,OnInit, OnDestroy} from '@angular/core'
import {  } from '@angular/core/src/metadata/lifecycle_hooks';
@Injectable()
export class SharedServices implements OnInit,OnDestroy{
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
}