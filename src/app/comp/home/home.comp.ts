/**
 * Created by wxh on 2016/10/20.
 */
import {Component} from '@angular/core';
import { DropdownModule ,AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import {  ROUTER_DIRECTIVES } from '@angular/router';
@Component({
    selector : 'my-app',
    templateUrl : './home.comp.html',
    directives : [ ROUTER_DIRECTIVES]
})
export class HomeComponent {
}
