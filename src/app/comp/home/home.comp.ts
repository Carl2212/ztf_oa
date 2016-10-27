/**
 * Created by wxh on 2016/10/20.
 */
import {Component ,Output ,EventEmitter} from '@angular/core';
import {Request} from "../../../core/comp/service/request";
import {GlobalEventManager} from "../../../core/comp/service/globaleventmanager";
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
    templateUrl : './home.comp.html',
})
export class HomeComponent {
    private umoption : any = true;
    constructor(private request : Request,private globalevent : GlobalEventManager,private localstorage : LocalStorageService) {
        let params = {username : 'zhqiq'}
        let _me = this;
        //this.request.getJsonp(params , 'wx_login' , function(data){
        //
        //    console.log('success',data);
        //});
        _me.localstorage.add('username','wxh wxh wxh');
        console.log(_me.localstorage.get('username'));
    }
    ngOninit() {
        console.log('1111111');
    }
    onoptions(data) {
        console.log(data);
    }
}
