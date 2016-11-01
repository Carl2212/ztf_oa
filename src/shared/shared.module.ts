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
//import {KeysPipe} from './pipe/pipe';


@NgModule({
    imports : [CommonModule ,LaddaModule ,FormsModule ],
    declarations : [ LoadingMoreComponent ,  OptionsBoxComponent ,RouterBoxComponent,SelectBoxComponent ,GrouplistComponent , UserselectComponent],//
    exports : [ LoadingMoreComponent,OptionsBoxComponent ,FormsModule ,RouterBoxComponent,SelectBoxComponent , GrouplistComponent , UserselectComponent]//
})
export class SharedModule {

}