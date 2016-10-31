/**
 * Created by Administrator on 2016/10/28.
 */
import {Component ,Input} from '@angular/core';
@Component({
    selector : 'processtab',
    template : `<ul class="processtab">
                    <li *ngFor="let ps of process" >
                        <dl class="tb-grid" *ngFor="let p of ps">
                            <dd>{{p.label}}</dd>
                            <dt>{{p.text}}</dt>
                        </dl>
                    </li>
                </ul>`,
    styleUrls : ['./processtab.less'],
})
export class ProcessTabComponent {
    @Input() process : any;
    constructor () {
        console.log(process);
    }
}