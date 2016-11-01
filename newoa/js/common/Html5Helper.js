SStorageHelper = function(){};
SStorageHelper.prototype = {
	save: function(key, value){
		window.sessionStorage.setItem(key,value);
	},
	getValue:function(key){
		return window.sessionStorage.getItem(key);
	},
	remove:function(key){
		window.sessionStorage.removeItem(key);
	},
	clean:function(){
		window.sessionStorage.clear();
	}
	
};