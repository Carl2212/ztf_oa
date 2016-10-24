/**
 * Created by wxh on 2016/10/20.
 */
import {NgModule, ApplicationRef} from '@angular/core';//, ApplicationRef
import { BrowserModule } from '@angular/platform-browser';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';//
import { RouterModule } from '@angular/router';

import { ENV_PROVIDERS } from './environment';
import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './comp/index/app.comp';
import {ListComponent} from './comp/list/list.comp';
import {DetailComponent} from './comp/detail/detail.comp';
import {AddressbkComponent} from './comp/addressbk/addressbk.comp';
import {SearchComponent} from './comp/search/search.comp';
import {HomeComponent} from './comp/home/home.comp';
import { AlertModule , DropdownModule , AccordionModule  } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
    imports : [ BrowserModule , AlertModule , DropdownModule ,  AccordionModule ,AppRoutingModule],
    declarations : [ AppComponent,HomeComponent ,ListComponent,DetailComponent,AddressbkComponent,SearchComponent],
    bootstrap : [ AppComponent ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
    ]
})
export class AppModule {}