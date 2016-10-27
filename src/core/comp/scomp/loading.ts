/**
 * Created by Administrator on 2016/10/25.
 * 加载Loading 模块
 */
import {Component} from '@angular/core';
import { GlobalEventManager } from '../service/globaleventmanager';
@Component({
    selector : 'loading',
    template : `<div class="ml" *ngIf="isshow">
                    <div class="ld-icon"><img src="../../../resources/images/loading.gif">
                    </div>
                 </div>`,
    styleUrls : ['./scomp.less']
})
export class LoadingComponent {
    private isshow : boolean = false;
    constructor (private global : GlobalEventManager) {
        let _me = this;
        this.global.showloading.subscribe((bl)=>_me.isshow = bl)
    }
}
