/**
 * Created by Administrator on 2016/10/27.
 * 意见框 组件
 */
import {Component ,Input, Output, EventEmitter , ViewChild} from '@angular/core';

@Component({
    selector : 'my-options',
    templateUrl : './optionsbox.html',
    styleUrls : ['../../shared.less'],
})
export class OptionsBoxComponent {
    @Input() myoptions : string = '';
    @Input() umopinion : any;
    //@Input() presentAlert : any;
    @Output() onoptions = new EventEmitter<any>();
    isopenumopinion : boolean = false;
    select : string ;
    constructor() {
    }
    outdata(event){
        this.onoptions.emit(event);
    }
    openumopinion() {
        this.isopenumopinion = true;
    }
    selumopinion() {
        this.myoptions = this.select;
        this.isopenumopinion = false;
        this.onoptions.emit(this.myoptions);
    }
    selectvalue(value) {
        this.select = value;
    }
    close() {
        this.isopenumopinion = false;
    }

}
