/**
 * Created by Administrator on 2016/10/28.
 */
import {Component , Input} from '@angular/core';
@Component({
    selector : 'detailtab',
    template : `<div class="detailtab">
                    <dl class="tb-grid" *ngFor="let dl of detail">
                        <dd *ngIf="dl.formtype == 1">{{dl.label}}</dd>
                        <dt>
                            <span (click)="showhtml(dl.text,dl)" *ngIf="dl.formtype != 1">{{dl.label}}</span>
                            <span *ngIf="dl.formtype == 1">{{dl.text}}</span>
                        </dt>
                    </dl>
                </div>`,
    styleUrls : ['./detailtab.less']
})
export class DetailTabComponent {
    @Input() detail :any;
    constructor () {

    }
}