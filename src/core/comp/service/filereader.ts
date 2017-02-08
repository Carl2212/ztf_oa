import {Component,Injectable} from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import {Config} from "./config";
import {Base64Service} from "./base64";
import {UrlutilService} from "./urlutil";
@Injectable()
export class FileReaderService {
    private iosFileTypeSupport : any ={
    '.doc':true,
    '.xls':true,
    //'.ppt':true,
    '.docx':true,
    '.xlsx':true,
    //'.pptx':true,
    '.pdf':true,
    '.txt':true,
    '.jpeg':true,
    '.ico':true,
    '.jpg':true,
    '.gif':true,
    '.jpe':true,
    '.bmp':true,
    '.png':true
    }
    constructor(private base64 : Base64Service , private urlutil :  UrlutilService , private router : Router) {

    }
    readFile(p_url, p_filename){
        var versionStr = navigator.appVersion.toLowerCase();
        if(versionStr.indexOf('iphone')>-1||versionStr.indexOf('ipad')>-1){
            this.iosReadFile(p_url, p_filename);
        }else{
            var suffix=/\.[^\.]+$/.exec(p_filename)[0].toLowerCase();
            if('.pdf'==suffix){
                this.readPdf(p_url, p_filename);
                return;
            }
            this.readFileOnline(p_url, p_filename);
        }
    };

    readFileOnline(p_url, p_filename){
        p_url=p_url.replace(/[+]/g, '%2B').replace(/[ ]/g, '%20');

        var url = this.base64.encode(p_url);
        var fileName = this.base64.encode(p_filename);
        url = (Config.global_url + '/wap/readonline/openhtml?path=' + url +'&filename=' + fileName).replace(/[+]/g, '%2B').replace(/[ ]/g, '%20');
        window.location.href = url;
    };

    iosReadFile(p_url, p_filename){
        p_url=p_url.replace(/[+]/g, '%2B').replace(/[ ]/g, '%20');
        var suffix=/\.[^\.]+$/.exec(p_filename)[0].toLowerCase();
        if(this.iosFileTypeSupport[suffix]){
            var sourceUrl = (Config.global_url + '/fileupdown/down?path=' + this.base64.encode(p_url) +'&filename=' + this.base64.encode('file'+suffix)).replace(/[+]/g, '%2B').replace(/[ ]/g, '%20');
            window.location.href=sourceUrl;
        }else{
            alert('暂不支持此文件类型！');
        }
    }

    readPdf(p_url, p_filename){
        console.log(this.urlutil.encode(p_url)+'&filename='+this.urlutil.encode(p_filename));
        this.router.navigate(['/readpdf',{url:this.urlutil.encode(p_url),filename:this.urlutil.encode(p_filename)}]);
    }
}