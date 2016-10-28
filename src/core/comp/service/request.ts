/**
 * Created by Administrator on 2016/10/25.
 * 服务器请求服务
 */
import {Injectable} from '@angular/core';
import {Headers , Http , Jsonp, URLSearchParams} from '@angular/http';
import {GlobalEventManager} from './globaleventmanager';
import {Config} from './config';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {isArray} from "util";


@Injectable()
export class Request {
    constructor(private http : Http,private jsonp : Jsonp , private global :GlobalEventManager) {}
    getJsonp(params : any , action : string , successfn : any,needglobalparams = true  , needloadingmodule = false) : any {
        //是否需要在请求接口的时候页面呈现loading状态
        if(needloadingmodule) {
            this.global.showloading.emit(true);
        }
        //是否需要配置变量
        let _me = this;
        if(needglobalparams !== false) {
            params['qybm'] = Config['global_qybm'];
            params['xmbm'] = Config['global_xmbm'];
        }
        let searchparams = this.ParamsToString(params);
        let url = Config.global_url + Config[action]+searchparams+'&callback=JSONP_CALLBACK';
        console.log(searchparams);
        return this.jsonp.request(url)
            .map(data => data.json())
            .subscribe(
                data =>{
                    if(needloadingmodule) _me.global.showloading.emit(false);
                    if(data.header.code == 1 && data.result.success == 1) {
                        successfn && successfn(data.result)
                    }else{
                        _me.handleError(data.header.describe);
                    }
                },
                error =>{
                    if(needloadingmodule) _me.global.showloading.emit(false);
                    _me.handleError(error)
                }
            )
    }
    postJson(params : any , action : string , successfn : any) : any {
        let _me = this;
        let headers = new Headers();
        let url = Config.global_url + Config[action];

        headers.append('Content-type','application/x-www-form-urlencoded');
        let searchparams = this.ToParams(params);

        return this.http.post(url,searchparams,{headers : headers})
                    .map(data => data.json())
                    .subscribe(
                        data=>successfn &&successfn(data),
                        error=>_me.handleError(error)
                    );
    }
    handleError(error) {
        console.log('error',error);
        this.global.showtoptip.emit(error);
    }
    /**
     * 参数转成 url携带的字符串参数
     */
    ParamsToString(params) {
        let sparams = '';
        for (var param in params ) {
            sparams +='&'+param+'='+params[param];
        }
        return sparams;
    }
    /**
     *  参数转成 post需要的格式
     */
    ToParams(params) {
        let sparams = new URLSearchParams();
        for (var param in params ) {
            sparams.set(param , params[param]);
        }
        return sparams;
    }


}
