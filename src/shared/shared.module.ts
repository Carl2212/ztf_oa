/**
 * Created by Administrator on 2016/10/27.
 * 共享模块 包括公共组件 指令 管道
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LaddaModule} from 'angular2-ladda';
import {FormsModule} from '@angular/forms';

import {LoadingMoreComponent} from './comp/loading_more';

import {OptionsBoxComponent} from './comp/optionsbox/optionsbox';
import {RouterBoxComponent} from './comp/routerbox/routerbox';
import {SelectBoxComponent} from './comp/selectbox/selectbox';
import {GrouplistComponent} from './comp/groupselect/grouplist';
import {UserselectComponent} from './comp/userselect/userselect';
import {NoContentComponent} from './comp/nocontent/nocontent';
import {DepartmentComponent} from './comp/department/department';
import {UsersComponent} from './comp/users/users';
import {UserInfoComponent} from './comp/userinfo/userinfo';


@NgModule({
    imports : [CommonModule ,LaddaModule ,FormsModule ],
    declarations : [ LoadingMoreComponent ,  OptionsBoxComponent , NoContentComponent ,RouterBoxComponent,SelectBoxComponent ,GrouplistComponent , UserselectComponent ,DepartmentComponent , UsersComponent , UserInfoComponent],//
    exports : [ LaddaModule,LoadingMoreComponent,OptionsBoxComponent ,FormsModule, NoContentComponent ,RouterBoxComponent,SelectBoxComponent , GrouplistComponent , UserselectComponent ,DepartmentComponent , UsersComponent , UserInfoComponent ]// ,
})
export class SharedModule {

}