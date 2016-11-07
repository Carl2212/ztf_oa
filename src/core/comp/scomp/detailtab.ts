/**
 * Created by Administrator on 2016/10/28.
 */
import {Component , Input} from '@angular/core';
import {UrlUtilService} from "../service/urlutil";
import {FileReaderService} from "../service/filereader";
import {GlobalEventManager} from "../service/globaleventmanager";
@Component({
    selector : 'detailtab',
    template : `<div class="detailtab">
                    <dl class="tb-grid" *ngFor="let dl of detail">
                        <dd *ngIf="dl.formtype == 1"><em>{{dl.label}}</em></dd>
                        <dt>
                            <span (click)="readfile(dl.text , dl.label)" *ngIf="dl.formtype != 1"><em class="glyphicon glyphicon-paperclip"></em> {{dl.label}}</span>
                            <span *ngIf="dl.formtype == 1">{{dl.text}}</span>
                        </dt>
                    </dl>
                </div>`,
    styleUrls : ['./detailtab.less']
})
export class DetailTabComponent {
    @Input() detail :any;
    @Input() isSecrecy : string;
    constructor (private urlutil : UrlUtilService , private filereader : FileReaderService ,private global : GlobalEventManager) {}
    readfile(url , filename) {
        if(this.isSecrecy == '1' ) {
            this.global.showtoptip.emit('加密公文附件请登录PC端查看！');
        }else{
            this.filereader.readFile(url, filename);
        }
    }
}