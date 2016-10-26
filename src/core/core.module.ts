/**
 * Created by wxh on 2016/10/25.
 * 公共单例组件模块
 */
import { ModuleWithProviders , NgModule , Optional , SkipSelf  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadingComponent} from './comp/scomp/loading';
import {LoadingMoreComponent} from './comp/scomp/loading_more';
import { ModalModule , AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import {LaddaModule} from 'angular2-ladda';
import { ToptipAlertComponent} from './comp/scomp/toptip';
import  {HttpModule ,JsonpModule} from '@angular/http';
import {Request} from './comp/service/request'

@NgModule({
    imports : [CommonModule , ModalModule ,AlertModule ,LaddaModule ,HttpModule ,JsonpModule],
    declarations : [LoadingComponent , LoadingMoreComponent ,ToptipAlertComponent],
    exports : [LoadingComponent ,LoadingMoreComponent ,ToptipAlertComponent],
    providers : [Request]
})
export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
