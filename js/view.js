(function(window){
	'use strict';

	function View(){
		this.newToDoInput = document.querySelector('.new-todo');
		this.list = document.querySelector('.todo-list');
	}

	View.prototype.createListItem = function(model){
		var li = document.createElement('li');
		
	    li.innerHTML =  '<div class="view">'
		+					'<input class="toggle" type="checkbox">'
		+					'<label>'+ model.title +'</label>'
		+					'<button class="turn-important"></button>'
		+					'<button class="destroy"></button>'
		+				'</div>';
		li.setAttribute("id", model.id);
		this.list.appendChild(li);
	}

	View.prototype.removeListItem = function(event, id){
		var t = event.target,
		parent = findParent(t,'li');

		findParent(t,'ul').removeChild(parent);
	}

	View.prototype.editLabel = function(event, id){
		var t = event.target,
			parent = findParent(t,'li'),
			input = document.createElement('input');

		if(t.tagName === 'LABEL'){
			parent.className = parent.className + ' editing';
			input.className = 'edit';
			parent.appendChild(input);
			input.focus();
			input.value = t.innerHTML;
			input.addEventListener('keypress', function(event){
				if(event.which === 13){
					t.innerHTML = input.value;
					parent.removeChild(input);
					parent.classList.remove('editing');
				}
			});
		}
	}

	View.prototype.toggleItemCompleted = function(event, id){
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
	}

	View.prototype.toggleImportant = function(id){
		var parent = findParent(event.target,'li'),
			parentClass = parent.classList;

		if(!parentClass.contains('important')){
			parentClass.add('important');
			if(parentClass.contains('completed')){
				parentClass.remove('completed');
				parent.getElementsByTagName('input')[0].setAttribute('checked', false);
				parent.getElementsByTagName('input')[0].removeAttribute('checked');
			}
		}else if(parentClass.contains('important')){
			parentClass.remove('important');
		}
	}

	window.app = window.app || {};
	window.app.View = View;
})(window);