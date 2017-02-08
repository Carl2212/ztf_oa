/**
 * Created by wxh on 2016/10/20.
 */
import {NgModule, ApplicationRef} from '@angular/core';//, ApplicationRef
import { BrowserModule } from '@angular/platform-browser';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';//
import { RouterModule } from '@angular/router';

import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';
import { ENV_PROVIDERS } from './environment';
import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './comp/index/app.comp';
import {ModuleListComponent} from './comp/modulelist/modulelist.comp';
import {DocListComponent} from './comp/doclist/doclist.comp';
import {DetailComponent} from './comp/detail/detail.comp';
import {AddressbkComponent} from './comp/addressbk/addressbk.comp';
import {SearchComponent} from './comp/search/search.comp';
import {HomeComponent} from './comp/home/home.comp';
import {NoticeComponent} from './comp/notice/notice.comp';
import {NoticeDetailComponent} from './comp/noticedetail/noticedetail.comp';
import {DotosubmitComponent} from './comp/dotosubmit/dotosubmit.comp';
import {ReadpdfComponent} from "./comp/readpdf/readpdf";

import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';

import {DropdownModule} from "ng2-bootstrap/components/dropdown";

let localStorageServiceConfig = {
    prefix: 'wx_ztfoa2',
    storageType: 'sessionStorage'
};

@NgModule({
    imports : [ BrowserModule , AppRoutingModule , CoreModule ,SharedModule ,DropdownModule ],
    declarations : [ AppComponent,HomeComponent ,NoticeComponent,ModuleListComponent,DocListComponent,DetailComponent,AddressbkComponent,SearchComponent,DotosubmitComponent ,NoticeDetailComponent , ReadpdfComponent],//
    bootstrap : [ AppComponent],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,LocalStorageService,{provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig}
    ]
})
export class AppModule {}