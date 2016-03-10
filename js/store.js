(function(window){
	'use strict';
//define constructor to local storage
	function Store(name, callback){

		callback = callback || function() {};	//in no callback parameter, then create func

		var data = { todo: [] };
		localStorage[name] = JSON.stringify(data);

	}
	

window.app = window.app || {};
window.app.Store = Store;
})(window);