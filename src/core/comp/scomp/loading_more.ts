/**
 * Created by Administrator on 2016/10/25.
 * 加载Loading 模块
 */
import {Component} from '@angular/core';

@Component({
    selector : 'loading-more',
    template : `<button class="btn btn-lg btn-primary ldmore" [ngClass]="{'active' : isactive}" (click)="isactive =true"></button>`,
    styleUrls : ['./scomp.less']
})
export class LoadingMoreComponent {
    private isactive : boolean = false;
    constructor() {

    }
    loadingmore() {
        //this.eleRef.nativeElement.querySelector('button')
        console.log('loadingmore........................');
        this.isactive = true;
    }
}
