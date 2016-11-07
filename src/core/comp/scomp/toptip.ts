/**
 * Created by Administrator on 2016/10/26.
 */
import {Component,ElementRef,ChangeDetectorRef,Input} from '@angular/core';
import {GlobalEventManager} from "../service/globaleventmanager";

@Component({
    selector : 'toptip-alert',
    template : `<ul class="top-tip"><li class="alert alert-warning " *ngFor="let tip of toptips">{{tip}}</li></ul>`,
    styleUrls : ['./scomp.less']
})
export class ToptipAlertComponent {
    private toptips : Array<string> = [];
    constructor (private globalevent : GlobalEventManager) {
        let _me = this;
        this.globalevent.showtoptip.subscribe((tip)=>{
            _me.toptips.push(tip);
            (function(attr,tip) {
                setTimeout(function () {
                    _me.removeval(attr,tip);
                }, 5000);
            })(_me.toptips, tip);
        })
    }
    removeval(arr,val) {
        let index = arr.indexOf(val);
        if(index > -1) {
            arr.splice(index,1);
        }
        return arr;
    }
    create() {

    }
}
