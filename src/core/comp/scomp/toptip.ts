/**
 * Created by Administrator on 2016/10/26.
 */
import {Component,ElementRef,ChangeDetectorRef,Input} from '@angular/core';

@Component({
    selector : 'toptip-alert',
    template : `<ul class="top-tip"><li class="alert alert-warning " *ngFor="let tip of toptips">{{tip}}</li></ul>`,
    styleUrls : ['./scomp.less']
})
export class ToptipAlertComponent {
    @Input() toptips : Array<string>;
    constructor () {
        //setInterval(function(){
        //    if(_me.tests.length > 0) {
        //        _me.tests = [];
        //    }else{
        //        _me.tests = ['1111111111'];
        //    }
        //    _me.cdr.detectChanges();
        //},5000);
    }
    create() {

    }
}
