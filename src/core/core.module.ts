/**
 * Created by wxh on 2016/10/25.
 * 公共单例组件模块
 */
import { ModuleWithProviders , NgModule , Optional , SkipSelf  } from '@angular/core';
import { CommonModule } from '@angular/common';
import  {HttpModule ,JsonpModule} from '@angular/http';

import { ModalModule , AlertModule } from 'ng2-bootstrap/ng2-bootstrap';


import {LoadingComponent} from './comp/scomp/loading';
import { ToptipAlertComponent} from './comp/scomp/toptip';

import {Request} from './comp/service/request';
import {GlobalEventManager} from './comp/service/globaleventmanager';

@NgModule({
    imports : [CommonModule , ModalModule ,AlertModule ,HttpModule ,JsonpModule],
    declarations : [LoadingComponent ,ToptipAlertComponent],
    exports : [LoadingComponent ,ToptipAlertComponent],
    providers : [Request , GlobalEventManager ]
})
export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
