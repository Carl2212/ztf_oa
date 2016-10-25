/**
 * Created by Administrator on 2016/10/21.
 */
import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {ListComponent} from './comp/list/list.comp';
import {DetailComponent} from './comp/detail/detail.comp';
import {AddressbkComponent} from './comp/addressbk/addressbk.comp';
import {AppComponent} from './comp/index/app.comp';
import {HomeComponent} from './comp/home/home.comp';
import {SearchComponent} from './comp/search/search.comp';
@NgModule({
    imports : [
        RouterModule.forRoot([
            {path : '',component : HomeComponent},
            {path : 'addressbk',component : AddressbkComponent},
            {path : 'search',component :SearchComponent},
            {path : 'list/:pagename',component : ListComponent},
            {path : 'detail/:docid',component : DetailComponent}
        ])
    ],
    exports : [RouterModule]
})
export class AppRoutingModule {}
