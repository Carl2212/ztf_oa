/**
 * Created by Administrator on 2016/10/25.
 * 加载Loading 模块
 */
import {Component} from '@angular/core';

@Component({
    selector : 'loading-more',
    template : `<button class="btn btn-lg btn-primary ldmore" [ladda]="isactive" data-style="slide-left" data-spinner-size="40" data-spinner-lines="10" (click)="loadingmore()">点击加载更多...</button>`,
    styleUrls : ['../shared.less']
})
export class LoadingMoreComponent {
    private isactive : boolean = false;
    constructor() {

    }
    loadingmore() {
        //this.eleRef.nativeElement.querySelector('button')
        console.log('loadingmore........................');
        this.isactive = !this.isactive;
    }
}
