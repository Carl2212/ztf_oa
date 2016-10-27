/**
 * Created by wxh on 2016/10/20.
 */
import {Component} from '@angular/core';

@Component({
    selector : 'my-app',
    templateUrl : './app.comp.html',
    styleUrls : ['../../../resources/test.css'],
})
export class AppComponent {
    public toptips : Array<string>;
    constructor() {}
    toptipsEvent(tip) {
        console.log(tip,'2222222');
        this.toptips.push(tip);
    }
}
