/**
 * Created by wxh on 2016/10/20.
 */
import {Component} from '@angular/core';

@Component({
    selector : 'my-app',
    templateUrl : './app.comp.html',
})
export class AppComponent {
    public toptips : Array<string>;
    constructor() {}
    toptipsEvent(tip) {
        this.toptips.push(tip);
    }
}
