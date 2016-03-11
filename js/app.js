(function(){
	'use strict';

	var item = document.querySelector('.new-todo'),
		list = document.querySelector('.todo-list');

	function createListItem(){
		var li = document.createElement('li');

		if(item.value.trim() === ''){
			item.value = '';
			return;
		}else{
		    li.innerHTML = '<div class="view">'
			+				'<input class="toggle" type="checkbox">'
			+				'<label>'+ item.value +'</label>'
			+				'<button class="turn-important"></button>'
			+				'<button class="destroy"></button>'
			+				'</div>';

			list.appendChild(li);
			store();
		}
		item.value = '';
	}

	function keyPress(e) {
	    if(e.which === 13) { createListItem(); }
	}

	window.findParent = function (element, tagName) {
		if (!element.parentNode) {
			return;
		}
		if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
			return element.parentNode;
		}
		return window.findParent(element.parentNode, tagName);
	};

	function store(){
		window.localStorage.myitems = list.innerHTML;
	}

	function retrieve(){
		list.innerHTML = window.localStorage.myitems || '';
	}

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
		store();
	}

	function editButton(event){
		var t = event.target,
			parent = findParent(t,'li'),
			parentClass = parent.classList;

		if(t.tagName === 'BUTTON'){
			if(t.classList.contains('destroy')){
				findParent(t,'ul').removeChild(parent);
			}
			if(t.classList.contains('turn-important')){
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
		}
		store();
	}

	function editLabel(event){
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
					store();
				}
			});
		}
	}

	function toggleEvents(event){
		var t = event.target.tagName;

		//if(t === 'LABEL'){ editLabel(event); }
		if(t === 'BUTTON'){ editButton(event); }
		if(t === 'INPUT'){ editInput(event); }
	}

	item.addEventListener('keypress', keyPress);
	list.addEventListener('click', toggleEvents);
	list.addEventListener('dblclick', editLabel);

	retrieve();
})();