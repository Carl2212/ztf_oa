/**
 * Created by Administrator on 2016/10/25.
 * 服务器请求服务
 */
import {Injectable} from '@angular/core';
import {Headers , Http , Jsonp, URLSearchParams} from '@angular/http';
import {Config} from './config';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


@Injectable()
export class Request {
    constructor(private http : Http,private jsonp : Jsonp) {}
    getJsonp(params : any , action : string , successfn : any,needglobalparams : boolean) : Promise<any> {
        let _me = this;
        if(needglobalparams !== false) {
            params['qybm'] = Config['global_qybm'];
            params['xmbm'] = Config['global_xmbm'];
        }
        let searchparams = this.ParamsToString(params);
        let url = Config.global_url + Config[action]+searchparams+'&callback=JSONP_CALLBACK';
        console.log(searchparams);
        return this.jsonp.request(url)
            .toPromise()
            .then(data =>successfn && successfn(data))
            .catch(error =>_me.handleError(error));
    }
    postJson(params : any , action : string , successfn : any) : Promise<any> {
        let _me = this;
        let headers = new Headers();
        let url = Config.global_url + Config[action];

        headers.append('Content-type','application/x-www-form-urlencoded');
        let searchparams = this.ToParams(params);

        return this.http.post(url,searchparams,{headers : headers})
                    .toPromise()
                    .then(data =>successfn && successfn(data))
                    .catch(error =>_me.handleError(error));
    }
    handleError(error) {
        console.log('error',error);
    }
    ParamsToString(params) {
        let sparams = '';
        for (var param in params ) {
            sparams +='&'+param+'='+params[param];
        }
        return sparams;
    }
    ToParams(params) {
        let sparams = new URLSearchParams();
        for (var param in params ) {
            console.log(param,params[param]);
            sparams.set(param , params[param]);
        }
        return sparams;
    }
}
