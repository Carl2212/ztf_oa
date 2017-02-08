/**
 * Created by Administrator on 2016/10/28.
 */
import {Component ,Input} from '@angular/core';
@Component({
    selector : 'processtab',
    template : `<ul class="processtab">
                    <li *ngFor="let ps of process" >
                        <table class="tb-box">
                            <tr class="tb-grid" *ngFor="let p of ps">
                                <td class="left"> <span class="txt">{{p.label}}</span></td>
                                <td class="right"><span class="txt">{{p.text}}</span></td>
                            </tr>
                        </table>

                    </li>
                </ul>`,
    styleUrls : ['./processtab.less'],
})
export class ProcessTabComponent {
    @Input() process : any;
    constructor () {
    }
}