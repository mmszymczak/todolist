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

	function toggleEvents(event){
		var t = event.target,
			parent = findParent(t,'li'),
			parentClass = parent.classList;

		if(t.tagName === 'LABEL'){

		}
		if(t.tagName === 'INPUT'){
			if(parentClass.length === 0){
				parentClass.add('completed');
			}else if(parentClass.contains('completed')){
				parentClass.remove('completed');
			}
		}
		if(t.tagName === 'BUTTON'){
			if(t.classList.contains('destroy')){
				findParent(t,'ul').removeChild(parent);
			}
			if(t.classList.contains('turn-important')){
				if(parentClass.length === 0){
					parentClass.add('important');
				}else if(parentClass.contains('important')){
					parentClass.remove('important');
				}
			}
		}
		store();
	}
//dodac komentarze i testy
	item.addEventListener('keypress', keyPress);
	list.addEventListener('click', toggleEvents);

	retrieve();
})();