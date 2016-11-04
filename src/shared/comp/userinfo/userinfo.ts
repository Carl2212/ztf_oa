/**
 * Created by Administrator on 2016/10/27.
 * 意见框 组件
 */
import {Component , Input} from '@angular/core';

@Component({
    selector : 'userinfo',
    templateUrl : './userinfo.html',
    styleUrls : ['./userinfo.less']
})
export class UserInfoComponent {
    @Input() selecteduser :any;
    constructor() {
    }
    closecard() {
        this.selecteduser = false;
    }
}
