/**
 * Created by wxh on 2016/10/20.
 */
import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ListComponent} from './comp/list/list.comp';
import {DetailComponent} from './comp/detail/detail.comp';
import {AddressbkComponent} from './comp/addressbk/addressbk.comp';
import {AppComponent} from './comp/index/app.comp';
import {SearchComponent} from './comp/search/search.comp';
import { AlertModule , DropdownModule , AccordionModule  } from 'ng2-bootstrap/ng2-bootstrap';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
    imports : [ BrowserModule , AppRoutingModule , AlertModule , DropdownModule ,  AccordionModule ],
    declarations : [ AppComponent , AddressbkComponent,ListComponent,DetailComponent,SearchComponent],
    bootstrap : [ AppComponent ]
})
export class AppModule {}