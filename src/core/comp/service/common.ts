/**
 * Created by Administrator on 2016/10/28.
 */

import {Component,Injectable} from '@angular/core';
import {Request} from "./request";
import {Config} from "./config";
import {isArray} from "rxjs/util/isArray";
import {isObject} from "rxjs/util/isObject";
import {LocalStorageService} from "angular-2-local-storage/dist/angular-2-local-storage";

@Injectable()
export class CommonService {

    constructor(private request : Request , private localstorage : LocalStorageService) {}
    /**
     * 通用方法之获取通讯录核心方法
     * @param type 组/用户
     * @param parentid 父节点id
     * @param addressType
     * @param callback 回调函数
     */
    getGroupOrUserList(type,parentid,callback) {
        //type = 1 为grouplist  2为userlist
        var _me = this;
        let userinfo :any;
        userinfo = this.localstorage.get('userinfo');
        let action = '';
        if(userinfo) {
            //数据
            let params = {
                userid : userinfo.userid,
                type : Config.addressType
            };
            if(type == 1) {
                params['parentid'] = parentid;
                params['alsouser'] = Config.alsouser;
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
                params['groupid'] = parentid.groupid;
                action = 'nextroute_user_action';
            }
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
    /**
     * 判断登录
     * @param callback
     */
    islogin(username? , callback?) {
        let _me = this;
        let userinfo = {};
        let params = {username : username};
        let action = 'wx_login';
        let userlist = [];
        this.request.getJsonp(params , action  , function(data){
            //处理数据
            if(data.userlist) {
                for(var items of data.userlist) {
                    var item = {};
                    for(var user of items) {
                        item[user.name] = user.text;
                    }
                    if(userlist && userlist.length <= 0) {//第一条数据作为登录账户
                        userinfo = item;
                    }
                    userlist.push(item);
                }
                _me.localstorage.add('userlist' ,userlist);
                _me.localstorage.add('userinfo' ,userinfo);
            }else if(data.userinfo) {//只有一个账户数据的时候
                for(var user of data.userinfo) {
                    userinfo[user.name] = user.text;
                }
                userlist.push(userinfo);
                _me.localstorage.add('userlist' ,userlist);
                _me.localstorage.add('userinfo' ,userinfo);
            }
            console.log(userinfo ,userlist);
            callback && callback(userinfo ,userlist);
        });
    }
    //通用方法之列项数量的获取
    gotCount(doctype, callback,userinfo?) {
        let _me = this;
        if(!userinfo) userinfo = this.localstorage.get('userinfo');
        if(userinfo) {
            let params = {username : userinfo.username,userid : userinfo.userid,doctype : doctype};
            let action = 'modulelist';
            _me.request.getJsonp(params , action,function(data){
                var modulelist = data.modulelist;
                var total_count = 0;
                if (modulelist && isArray(modulelist)) {
                    for (var items of modulelist) {
                        total_count += parseInt(items.count);
                    }
                }
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
    DocToJson(params) {
        if (!params || (isArray(params) && params.length <= 0)) return params;
        let jdata = [];
        for (var param of params) {
            var view = {};
            for (var it of param.view) {
                view[it.name] = it.text;
            }
            var detailparam = {};
            for (var it of param.detailparam) {
                detailparam[it.name] = it.text;
            }
            jdata.push({view: view, detailparam: detailparam});
        }
        return jdata;
    }
    concatarray(a,b) {
        for(let tmp of b) {
            a.push(tmp);
        }
        return a;
    }

}