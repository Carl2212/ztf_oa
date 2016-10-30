/**
 * Created by Administrator on 2016/10/28.
 */

import {Component,Injectable} from '@angular/core';
import {Request} from "./request";
import {Config} from "./config";
import { LocalStorageService } from 'angular-2-local-storage';
import {isArray} from "rxjs/util/isArray";
import {isObject} from "rxjs/util/isObject";

@Injectable()
export class CommonService {

    constructor(private request : Request , private localstorage : LocalStorageService) {

    }
    //通用方法之列项数量的获取
    gotCount(doctype, callback,userinfo?) {
        let _me = this;
        console.log(userinfo);
        if(!userinfo) userinfo = this.localstorage.get('userinfo');
        if(userinfo) {
            let params = {username : userinfo.username,userid : userinfo.userid,doctype : doctype};
            let action = 'modulelist';
            _me.request.getJsonp(params , action,function(data){
                console.log(data.modulelist);
                var modulelist = data.modulelist;
                var total_count = 0;
                if (modulelist) {
                    for (var items of modulelist) {
                        total_count += parseInt(items.count);
                    }
                }
                console.log(total_count, modulelist);
                callback && callback(total_count, modulelist);
            });
        }

    }
}