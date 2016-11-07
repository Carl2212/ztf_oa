/**
 * Created by Administrator on 2016/10/25.
 * 加载Loading 模块
 */
import {Component , Input , Output , EventEmitter} from '@angular/core';
@Component({
    selector : 'alertcomp',
    template : `<div class="ml" *ngIf="alertparams?.isshow">
                    <div class="alertbox">
                        <span class="close" (click)="close()">x</span>
                        <div class="alert-content">{{alertparams?.content}}</div>
                        <div class="btn-bar"><a class="bg-red" *ngIf="alertparams?.okbutton" (click)="okfunction()">是</a><a  class="bg-gray" *ngIf="alertparams?.cancelbutton" (click)="close()">否</a></div>
                    </div>
                 </div>`,
    styleUrls : ['./scomp.less']
})
export class AlertComponent {
    @Input() alertparams : any;
    @Output() outdata = new EventEmitter<any>();
    constructor () {}
    okfunction() {
        this.outdata.emit(true);
    }
    close() {
        this.alertparams.isshow = false;
    }
}
