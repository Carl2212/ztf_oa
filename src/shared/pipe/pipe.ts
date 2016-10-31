/**
 * Created by Administrator on 2016/10/27.
 * 简单的管道 全部包含在这个文件里面
 */
import {Pipe,PipeTransform} from '@angular/core';

/*转化为key-value的数组转成{key:xxx,value:xxx}方便遍历*/
@Pipe({name: 'keyvalue'})
export class KeysPipe implements PipeTransform {
    transform(value : any, args:string[]) : any {
        let keys = [];
        for (let key in value) {
            keys.push({key: key, value: value[key]});
        }
        return keys;
    }
}


