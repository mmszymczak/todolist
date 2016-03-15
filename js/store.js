(function(window){
	'use strict';



	function Store(array){
		this.array = array;
	}

	Store.prototype.addObjectToLocalStorage = function(object){
		this.array.push(object);
		window.localStorage.toDoDB = JSON.stringify(this.array);
	}

	Store.prototype.removeObjectFromLocalStorage = function(id){ 
		var index = this.array.map(function(e){ return e.id }).indexOf(id);

		if(index > -1){
			this.array.splice(index,1);
		}
		window.localStorage.toDoDB = JSON.stringify(this.array);
	}




window.app = window.app || {};
window.app.Store = Store;
})(window);