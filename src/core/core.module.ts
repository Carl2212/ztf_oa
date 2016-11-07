/**
 * Created by wxh on 2016/10/25.
 * 公共单例组件模块
 */
import { ModuleWithProviders , NgModule , Optional , SkipSelf  } from '@angular/core';
import { CommonModule } from '@angular/common';
import  {HttpModule ,JsonpModule} from '@angular/http';

import { ModalModule , AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import {LoadingComponent} from './comp/scomp/loading';
import {ToptipAlertComponent} from './comp/scomp/toptip';
import {ProcessTabComponent} from './comp/scomp/processtab';
import {DetailTabComponent} from './comp/scomp/detailtab';
import {AlertComponent} from './comp/scomp/alert';

import {Request} from './comp/service/request';
import {CommonService} from './comp/service/common';
import {UrlUtilService} from './comp/service/urlutil';
import {Base64Service} from './comp/service/base64';
import {FileReaderService} from './comp/service/filereader';
import {GlobalEventManager} from './comp/service/globaleventmanager';
import {Config} from './comp/service/config';

@NgModule({
    imports : [CommonModule , ModalModule ,AlertModule ,HttpModule ,JsonpModule],
    declarations : [LoadingComponent ,ToptipAlertComponent ,ProcessTabComponent,DetailTabComponent , AlertComponent],
    exports : [LoadingComponent ,ToptipAlertComponent,ProcessTabComponent,DetailTabComponent , AlertComponent],
    providers : [Request , GlobalEventManager, CommonService ,UrlUtilService ,Base64Service ,FileReaderService]
})
export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
