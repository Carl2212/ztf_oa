/**
 * Created by wxh on 2016/10/20.
 */
import {Component , Output ,EventEmitter} from '@angular/core';
import {Request} from "../../../core/comp/service/request";
@Component({
    templateUrl : './home.comp.html',
})
export class HomeComponent {
    @Output() toptipsEvent = new EventEmitter<any>();
    constructor(private request : Request) {
        let _me = this;
        let params = {username : 'zhqiq'}
        this.request.getJsonp(params , 'wx_login' , function(data){
            console.log('success',data);
        },true);
        setTimeout(function(){
            console.log('11111111');
            _me.toptipsEvent.emit('wxh wxh wxh');
        },5000);
    }
    ngOninit() {
        console.log('1111111');
    }
}
