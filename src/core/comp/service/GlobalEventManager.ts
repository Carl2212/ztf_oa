/**
 * Created by wxh on 2016/10/26.
 */
import { Injectable ,EventEmitter} from '@angular/core';

@Injectable()

export class GlobalEventManager {
    public showtoptip = new EventEmitter<any>();
    public showloading = new EventEmitter<any>();
    constructor(){}
}