/**
 * Created by Administrator on 2016/10/27.
 * 意见框 组件
 */
import {Component ,Input} from '@angular/core';

@Component({
    selector : 'users',
    templateUrl : './users.html',
    styleUrls : ['./users.less'],
})
export class UsersComponent {
    @Input() useritems : any;
    selecteduser : any;
    constructor() {
    }
    userinfo(event, user) {
        this.selecteduser = user;
    }
}
