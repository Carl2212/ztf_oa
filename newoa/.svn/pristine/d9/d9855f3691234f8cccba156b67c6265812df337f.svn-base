/**
 * 获取url中"?"符后的字串，
 * key为空时，返回整个参数串. key不为空时，返回指定key的参数值;没找到key时，返null.
 * @param key 要获取参数值的名称
 * @returns
 */
function getURLParam(key){
	var url = location.search; //获取url中"?"符后的字串 
	if (url.indexOf("?") != -1) { 
	   var str = url.substr(1); 
	   if(null == key){
		   return str;
	   }
	   var strs = str.split("&"); 
	   for(var i = 0; i < strs.length; i ++) { 
		   var perParam = strs[i].split("=");
		   if(perParam[0] == key){
			   return perParam[1];
			   break;
		   }
	   } 
	} 
};

$.fn.serializeObject = function()  
{  
   var o = {};  
   var a = this.serializeArray();  
   $.each(a, function() {  
       if (o[this.name]) {  
           if (!o[this.name].push) {  
               o[this.name] = [o[this.name]];  
           }  
           o[this.name].push(this.value || '');  
       } else {  
           o[this.name] = this.value || '';  
       }  
   });  
   return o;  
};

(function ($) {
	/**
	 * jQuery.jsonGet
	 *
	 * @param url {String}
	 * @param data {Json Object}
	 * @param successFun {callback function when success}
	 * @param errorFun {callback function when error}
	 */
	$.jsonGet = function(options){
				
		var defaultErrFun = function(XMLHttpRequest, textStatus, errorThrown){  
			 $.mobile.hidePageLoadingMsg();
			 alert("请求远程服务错误!");
		};
		
		var defaultbeforeSend = function(){
			$.mobile.showPageLoadingMsg(); 
			if(options.beforeSendFun){
				options.beforeSendFun();
			}
		};
		
		var defaultComplete = function() {   
//		   $.mobile.hidePageLoadingMsg(); 
		   if(options.completeFun){
			   options.completeFun();
			}
	    };
		
		if(!options.error){
			options.error = defaultErrFun;
		};
		
		try{
			if(options.data){
				jQuery.ajax( {
					async: false,
					type: "get", 
					dataType: 'json',
					url: options.url, 
					data: options.data, 
					timeout: 30000,
					success : options.success,
					error : options.error,
					beforeSend: defaultbeforeSend, 
				    complete: defaultComplete
				});
			}else{
				jQuery.ajax( {
					async: false,
					type: "get", 
					dataType: 'json',
					url: options.url, 
					timeout: 30000,
					success : options.success,
					error : options.error,
					beforeSend: defaultbeforeSend, 
				    complete: defaultComplete
				});
			}
		}catch(e){
			
		}
		
	};
	
	/**
	 * jQuery.jsonPost
	 *
	 * @param url {String}
	 * @param data {Json Object}
	 * @param successFun {callback function when success}
	 * @param errorFun {callback function when error}
	 */
	
	$.jsonPost = function(options){
		var defaultErrFun = function(XMLHttpRequest, textStatus, errorThrown){
//			 $.mobile.hidePageLoadingMsg();
			$("#maskDiv")&&$("#maskDiv").hide();
			alert(textStatus);
			// alert("请求远程服务错误!");
		};
		
		var defaultbeforeSend = function(){
//			$.mobile.showPageLoadingMsg(); 
			if(options.beforeSendFun){
				options.beforeSendFun();
			}
		};
		
		var defaultComplete = function() {   
//		   $.mobile.hidePageLoadingMsg(); 
		   if(options.completeFun){
			   options.completeFun();
			}
	    };
		
		if(!options.error){
			options.error = defaultErrFun;
		};
		
		try{
			if(options.data){
				jQuery.ajax( {
					async: true,
					type: "post", 
					dataType: 'json',
					url: options.url, 
					data: options.data, 
					timeout: 30000,
					success : options.success,
					error : options.error,
					beforeSend: defaultbeforeSend, 
				    complete: defaultComplete
				});
			}else{
				jQuery.ajax( {
					async: true, 
					type: "post", 
					dataType: 'json',
					url: options.url, 
					timeout: 30000,
					success : options.success,
					error : options.error,
					beforeSend: defaultbeforeSend, 
				    complete: defaultComplete
				});
			}
		}catch(e){
			
		}
		
	};

}(jQuery));