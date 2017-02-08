/**
 * Created by Administrator on 2016/10/28.
 */
import {Component , Input} from '@angular/core';
import {FileReaderService} from "../service/filereader";
import {GlobalEventManager} from "../service/globaleventmanager";
import {UrlutilService} from "../service/urlutil";
@Component({
    selector : 'detailtab',
    template : `<table class="detailtab">
                    <tr class="tb-grid" *ngFor="let dl of detail">
                        <td class="left" *ngIf="dl.formtype == 1"><em>{{dl.label}}</em></td>
                        <td class="right" [attr.colspan]="(dl.formtype != 1) ? 2 : 1">
                            <span (click)="readfile(dl.text , dl.label)" *ngIf="dl.formtype != 1"><em class="glyphicon glyphicon-paperclip"></em> {{dl.label}}</span>
                            <span *ngIf="dl.formtype == 1">{{dl.text}}</span>
                        </td>
                    </tr>
                </table>`,
    styleUrls : ['./detailtab.less']
})
export class DetailTabComponent {
    @Input() detail :any;
    @Input() isSecrecy : string;
    constructor (private filereader : FileReaderService ,private global : GlobalEventManager , private urlutil :  UrlutilService) {}
    readfile(url , filename) {
        if(!url) {
            this.global.showtoptip.emit('文件不存在，请登录PC端查看');
            return;
        }
        if(this.isSecrecy == '1' ) {
            this.global.showtoptip.emit('加密公文附件请登录PC端查看！');
            return;
        }else{
            url = this.urlutil.decode(url);
            this.filereader.readFile(url, filename);
        }
    }
}