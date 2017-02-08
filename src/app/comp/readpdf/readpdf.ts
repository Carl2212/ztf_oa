/**
 * Created by Administrator on 2016/10/27.
 * 意见框 组件
 */
import {Component } from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import {Base64Service} from "../../../core/comp/service/base64";
import {UrlutilService} from "../../../core/comp/service/urlutil";
import {LocalStorageService} from "angular-2-local-storage/dist/angular-2-local-storage";
import {Request} from "../../../core/comp/service/request";
import {Config} from "../../../core/comp/service/config";

@Component({
    templateUrl : './readpdf.html',
    styleUrls : ['./readpdf.less']
})
export class ReadpdfComponent {
    private url : string;
    private filename :string;
    private newfilename : string;
    private userinfo ;
    public imggroups : any =[];
    //pdf当前展示第几页
    public imgindex : number = 1;
    //pdf页数
    public imgcount : number = 0;

    constructor(private base64 : Base64Service , private urlutil : UrlutilService , private router  : Router,  private route :ActivatedRoute , private localstorage :LocalStorageService , private request : Request ) {
        this.url = this.route.snapshot.params['url'];
        this.filename = this.route.snapshot.params['filename'];

        if(!this.url || !this.filename) {
            console.log('无法打开文件');
        }
        this.url = this.urlutil.decode(this.url);
        this.filename = this.urlutil.decode(this.filename);
        console.log(this.url,this.filename);
        if(!this.userinfo) {
            this.userinfo = this.localstorage.get('userinfo');
            if(!this.userinfo || !this.userinfo.userid) {
                console.log('请先登录~');
            }
        }
    }
    ngOnInit() {
        var _me = this;
        this.getPdfPageCount(function(count) {
            _me.imgcount = count;
            _me.showImg(count)
        });
    }
    getPdfPageCount(callback){
        let _me = this;
        this.newfilename = this.userinfo.username+'_'+ (new Date()).valueOf()+'.pdf';
        let params = {
            path : this.base64.encode(this.url),
            userid : this.userinfo.userid,
            filename :this.base64.encode(this.newfilename),
        };
        let action = 'pdfpagecount_action';
        //请求
        _me.request.getJsonp(params,action,function(data){
            if(data.pageCount) {
                callback(data.pageCount);
            }

        });
    };
    showImg(count){
        for(var i=0; i<count; i++){
            this.imggroups.push(Config.global_url + Config.pdfpageimg_action + '?pageindex='+i+'&filename='+this.urlutil.encode(this.base64.encode(this.newfilename)));
        }
        console.log(this.imggroups);
    }
    left() {
        console.log(this.imgindex);
        if(this.imgindex > 1) {
            this.imgindex -=1;
        }
    }
    right() {
        console.log(this.imgindex);
        if(this.imgindex < this.imgcount) {
            this.imgindex +=1;
        }
    }

}
