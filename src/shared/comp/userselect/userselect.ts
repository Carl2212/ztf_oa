/**
 * Created by Administrator on 2016/10/27.
 * 选择 用户 组件
 */
import {Component ,Input, Output, EventEmitter} from '@angular/core';
import {CommonService} from "../../../core/comp/service/common";
import {Config} from "../../../core/comp/service/config";
import {isArray} from "rxjs/util/isArray";

@Component({
    selector : 'userselect',
    templateUrl : './userselect.html',
    styleUrls : ['./userselect.less'],
})
export class UserselectComponent {
    @Input() userlist : any;
    @Input() group : any;
    @Input() multiuser : boolean;
    @Input() historyusers : any =[];//传下来的已经选择的数据
    @Input() chooseornot : boolean;
    selectusers : any =[];//要传上去的选择的数据

    @Output() outusers = new EventEmitter<any>();
    constructor(private commonfn : CommonService) {

    }
    ngOnInit() {
        if(isArray(this.historyusers)) {
            for(let g of this.historyusers) {
                if(g.group && (g.group.groupid == this.group.groupid)) {
                    for(let user of g.userselect) {
                        this.selectusers[user.userid+'@'+user.username] = true;
                    }
                }
            }
        }
    }
    ngOnChanges(event) {
        this.ChooseallOrnot(this.chooseornot);
    }
    outputdata() {
        return {selectusers:this.selectusers , group : this.group};
    }
    nomultiuser(user) {
        let tmp = {};
        tmp[user] = true;
        this.selectusers = tmp;
    }
    /*********************************************
     * 全选以及全不选
     * input :  e  boolean 选择项的值 tmpdata 子部门数据
     *********************************************/
    ChooseallOrnot(e) {
        if(e) {
            //全选
            for(let t of this.userlist) {
                this.selectusers[t.userid + '@' + t.cnname] = true;
            }
        }else{
            //全不选
            for(let t of this.userlist) {
                this.selectusers[t.userid + '@' + t.cnname] = false;
            }
        }
    }
}