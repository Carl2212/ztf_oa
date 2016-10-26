/**
 * Created by wxh on 2016/10/20.
 */
import {Component , Output ,EventEmitter} from '@angular/core';
import {Request} from "../../../core/comp/service/request";
import {GlobalEventManager} from "../../../core/comp/service/globaleventmanager";
@Component({
    templateUrl : './home.comp.html',
})
export class HomeComponent {
    constructor(private request : Request,private globalevent : GlobalEventManager) {
        let _me = this;
        let params = {username : 'zhqiq'}
        //this.request.getJsonp(params , 'wx_login' , function(data){
        //    console.log('success',data);
        //},true);
        let i = 0;
        //setInterval(function(){
        //    console.log('11111111');
        //    i++;
        //    _me.globalevent.showtoptip.emit('wxh wxh wxh'+i);
        //},3000);
    }
    ngOninit() {
        console.log('1111111');
    }
}
