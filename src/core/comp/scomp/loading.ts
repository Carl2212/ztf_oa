/**
 * Created by Administrator on 2016/10/25.
 * 加载Loading 模块
 */
import {Component} from '@angular/core';

@Component({
    selector : 'loading',
    template : `
                 <div class="ml">
                    <div class="ld-icon"><img src="../../../resources/images/loading.gif">
                    </div>
                 </div>`,
    styleUrls : ['./scomp.less']
})
export class LoadingComponent {
    private ishidden : boolean = false;
    constructor () {}
}
