/**
 * Created by wxh on 2016/10/20.
 */
import {Component ,Output ,EventEmitter} from '@angular/core';
import {Request} from "../../../core/comp/service/request";
import {GlobalEventManager} from "../../../core/comp/service/globaleventmanager";
import {LocalStorage} from 'angular2-localstorage/WebStorage';

@Component({
    templateUrl : './home.comp.html',
})
export class HomeComponent {
    private umoption : any = true;
    @LocalStorage() public username : string = '';
    constructor(private request : Request,private globalevent : GlobalEventManager) {
        let params = {username : 'zhqiq'}
        this.request.getJsonp(params , 'wx_login' , function(data){

            console.log('success',data);
        });
    }
    ngOninit() {
        console.log('1111111');
    }
    onoptions(data) {
        console.log(data);
    }
}
