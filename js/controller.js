(function(window){
	'use strict';

	
	function Controller(model, view) {
		var self = this;
		self.model = model;
		self.view = view;
	}

	Controller.prototype.restoreStorage = function(){
		this.model.localStorage.array.forEach(function(object){
			todo.view.createListItem(object);
		});
	}

	Controller.prototype.selectEvent = function(event, id){
		if(event.target.classList.contains('destroy')){
			this.view.removeListItem(event, id);
		}
		if(event.target.classList.contains('turn-important')){
			this.view.toggleImportant(event, id);
		}
	}



window.app = window.app || {};
window.app.Controller = Controller;
})(window);