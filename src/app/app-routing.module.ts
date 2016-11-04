/**
 * Created by Administrator on 2016/10/21.
 */
import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {ModuleListComponent} from './comp/modulelist/modulelist.comp';
import {DocListComponent} from './comp/doclist/doclist.comp';
import {DetailComponent} from './comp/detail/detail.comp';
import {AddressbkComponent} from './comp/addressbk/addressbk.comp';
import {AppComponent} from './comp/index/app.comp';
import {HomeComponent} from './comp/home/home.comp';
import {SearchComponent} from './comp/search/search.comp';
import {NoticeComponent} from './comp/notice/notice.comp';
import {NoticeDetailComponent} from './comp/noticedetail/noticedetail.comp';
import {DotosubmitComponent} from './comp/dotosubmit/dotosubmit.comp';
@NgModule({
    imports : [
        RouterModule.forRoot([
            {path : '',component : HomeComponent},
            {path : 'addressbk',component : AddressbkComponent},
            {path : 'search',component :SearchComponent},
            {path : 'modulelist/:pagename',component : ModuleListComponent},
            {path : 'doclist/:pagename/:moduleid',component : DocListComponent},
            {path : 'notice',component : NoticeComponent},
            {path : 'noticedetail/:noticeid',component : NoticeDetailComponent},
            {path : 'dotosubmit/:pagename/:moduleid/:nodeid/:docid/:appid',component : DotosubmitComponent},
            {path : 'detail/:pagename/:moduleid/:nodeid/:docid/:appid',component : DetailComponent}
        ], { useHash: true })
    ],
    exports : [RouterModule]
})
export class AppRoutingModule {}
