(function(window){
	'use strict';

	function Model(data){
		this.localStorage = data;
	}

	Model.prototype.create = function(title){
		var title = title || '';
		var newItem = {
			id: new Date().getTime(),
			title: title
		};

		this.localStorage.addObjectToLocalStorage(newItem);
		return newItem;
	}

	Model.prototype.removeElement = function(id){
		this.localStorage.removeObjectFromLocalStorage(id);
	}

	Model.prototype.addElement = function(event){
		if(event.which === 13) {
	    	if(this.value.trim() === ''){
				this.value = ''; 
				return;
			}
			var newitem = todo.model.create(this.value);
			todo.view.createListItem(newitem);
			this.value = '';
		}
	}


	window.app = window.app || {};
	window.app.Model = Model;
})(window);