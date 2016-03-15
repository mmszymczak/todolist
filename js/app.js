(function(){
	'use strict';

	var objectsFromLocalStorage = [];
	if(window.localStorage.toDoDB){
		objectsFromLocalStorage = JSON.parse(window.localStorage.toDoDB); 
	}

	function Init(name, array){
		this.storage = new app.Store(array);
		this.model = new app.Model(this.storage);
		this.view = new app.View();    
		this.controller = new app.Controller(this.model, this.view);
	}

	var todo = new Init('magic-todo', objectsFromLocalStorage);
	window.todo = todo;

/////////////  Listeners
	todo.view.list.addEventListener('dblclick', function(event){
		var obj = window.findParent(event.target, 'li');
		var parentId = parseInt(obj.getAttribute('id'), 10);

		todo.view.editLabel(event, parentId);
	});

	todo.view.list.addEventListener('click', function(event){
		var t = event.target.tagName;
		var obj = window.findParent(event.target, 'li');
		var parentId = parseInt(obj.getAttribute('id'), 10);

		if(t === 'BUTTON'){ 
			todo.controller.selectEvent(event, parentId); 
		} 
		if(t === 'INPUT'){ 
			todo.view.toggleItemCompleted(event, parentId); 
		}
	});

	todo.view.newToDoInput.addEventListener('keypress', todo.model.addElement);
	todo.controller.restoreStorage();

})();



/*
dodac obsluge templatki
zapisywac zmiany z eventow do localstorage
przeniesc listenery do controlera?
poustawiac odpowiednie konteksty 
*/