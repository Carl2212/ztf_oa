/**
 * Created by Administrator on 2016/10/27.
 * 简单的管道 全部包含在这个文件里面
 */
import {Pipe,PipeTransform} from '@angular/core';

/*处理数据dotosubmit页面，将数组key中的数据提取*/
@Pipe({name : 'keytoparams'})
export class KeyToParamsPipe implements PipeTransform {
    transform(value :any , args : string) : any {
        let items;
        items = value.split('@');
        return items[args];
    }
}

