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
    /**
     * 通用方法之获取通讯录核心方法
     * @param type 组/用户
     * @param parentid 父节点id
     * @param addressType
     * @param callback 回调函数
     */
    getGroupOrUserList(type,parentid,addressType,callback) {
        //type = 1 为grouplist  2为userlist
        console.log(type,parentid,addressType);
        var _me = this;
        let userinfo = this.localstorage.get('userinfo');
        let action = '';
        if(userinfo) {
            //数据
            let params = {
                userid : userinfo.userid,
                type : addressType
            };
            if(type == 1) {
                params['parentid'] = parentid;
                action = 'grouplist_action' ;
            }else if(type ==2 ){
                params['groupid']=parentid;
                action = 'userlist_action';
            }else if(type == 3) {
                params['moduleid'] = parentid.moduleid;
                params['docid'] = parentid.docid;
                params['nextnodeid'] = parentid.nextnodeid;
                action = 'nextroute_group_action';
            }else if(type == 4) {
                params['moduleid'] = parentid.moduleid;
                params['docid'] = parentid.docid;
                params['nextnodeid'] = parentid.nextnodeid;
                params['groupid'] = 'Role';
                action = 'nextroute_user_action';
            }
            console.log(type == 3,action);
            //请求
            _me.request.getJsonp(params,action,function(data){
                //回调
                if(type == 1 || type == 3) {
                    callback(data.grouplist);
                }else{
                    callback(_me.ParamsToJson(data.userlist));
                }
            });
        };
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
    ParamsToJson(params :any , k:string="name" , v : string="text") {
        if(!params || !isArray(params) || params.length <= 0) return [];
        let jdata = [];
        for (var param of params ) {
            jdata.push(this.OneToJson(param , k , v));
        }
        return jdata;
    }
    OneToJson(param :any , k:string="name" , v : string="text") {
        if(!param || !isArray(param) || param.length <= 0) return [];
        var tmp = [];
        for(var item of param) {
            tmp[item[k]] = item[v];
        }
        return tmp;
    }
    isEmptyObject(obj) {
        for(var i in obj) {
            return false;
        }
        return true;
    }

}