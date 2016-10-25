/**
 * Created by wxh on 2016/10/25.
 * 公共单例组件模块
 */
import { ModuleWithProviders , NgModule , Optional , SkipSelf  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadingComponent} from './comp/scomp/loading';
import {LoadingMoreComponent} from './comp/scomp/loading_more';
import { ModalModule , AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import {Config} from './comp/service/config';

@NgModule({
    imports : [CommonModule , ModalModule ,AlertModule , ],
    declarations : [LoadingComponent , LoadingMoreComponent, Config],
    exports : [LoadingComponent ,LoadingMoreComponent , Config],
    providers : []
})
export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
