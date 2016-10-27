/**
 * Created by Administrator on 2016/10/21.
 */
import {Component} from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
@Component({
    template : '<alert>hello world</alert>'
})
export class ListComponent {
    private listpage : string ;
    constructor(private router : Router , private route : ActivatedRoute) {
        //this.listpage = this.route.queryParams.subscribe((data)=>console.log(data['v']));
        console.log(this.listpage);
    }

}
