(function(window){
	'use strict';

	
	function Controller(model, view) {
		this.model = model;
		this.view = view;
	}

	Controller.prototype.restoreStorage = function(){
		var self = this;
		this.model.localStorage.array.forEach(function(object){
			self.view.createListItem(object);
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

	Controller.prototype.getEventListener = function(){
		// ? ? ?
	}



window.app = window.app || {};
window.app.Controller = Controller;
})(window);