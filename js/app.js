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


	window.findParent = function (element, tagName) {
		if (!element.parentNode) {
			return;
		}
		if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
			return element.parentNode;
		}
		return window.findParent(element.parentNode, tagName);
	};

//	will trigger list item between classes completed and empty
	function editInput(event){
		var t = event.target,
			parent = findParent(t,'li'),
			parentClass = parent.classList;

		if(t.tagName === 'INPUT'){
			if(!parentClass.contains('completed')){	
				parentClass.add('completed');
				t.setAttribute('checked', true);
				if(parentClass.contains('important')){
					parentClass.remove('important');
				}
			}else if(parentClass.contains('completed')){
				parentClass.remove('completed');
				t.removeAttribute('checked');
			}
		}
		//store();
	}

	todo.view.list.addEventListener('dblclick', function(event){
		var obj = findParent(event.target, 'li');
		var parentId = parseInt(obj.getAttribute('id'), 10);

		todo.view.editLabel(event, parentId);
	});

	todo.view.list.addEventListener('click', function(event){
		var t = event.target.tagName;
		var obj = findParent(event.target, 'li');
		var parentId = parseInt(obj.getAttribute('id'), 10);

		if(t === 'BUTTON'){ 
			todo.controller.selectEvent(event, parentId); 
		} 
		if(t === 'INPUT'){ 
			editInput(event); 
		}
	});

	todo.view.newToDoInput.addEventListener('keypress', todo.model.addElement);
	todo.controller.restoreStorage();

})();