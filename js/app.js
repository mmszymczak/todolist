(function(){
	'use strict';

	var item = document.querySelector('.new-todo'),
		list = document.querySelector('.todo-list'),
		titlesFromLocalStorage = [];

//	if local storage exists then get elements from there and assign to local array
	if(window.localStorage.titles){
		titlesFromLocalStorage = JSON.parse(window.localStorage.titles); 
	}
//	will create new li element and appends to the end of ul
	function createListItem(title){
		var li = document.createElement('li');
		
	    li.innerHTML = '<div class="view">'
		+				'<input class="toggle" type="checkbox">'
		+				'<label>'+ title +'</label>'
		+				'<button class="turn-important"></button>'
		+				'<button class="destroy"></button>'
		+				'</div>';

		list.appendChild(li);
	}
//	if Enter pressed then get title(value) from input, creating element and adding to local storage
	function addElement(e) {
	    if(e.which === 13) {
	    	if(item.value.trim() === ''){
				item.value = ''; 
				return;
			}
			createListItem(item.value);
			addTitleToLocalStorage(item.value);
			item.value = '';	 
	    }
	}

	function addTitleToLocalStorage(title){
		titlesFromLocalStorage.push(title);
		window.localStorage.titles = JSON.stringify(titlesFromLocalStorage);
	}

	function removeTitleFromLocalStorage(title){
		var index = titlesFromLocalStorage.indexOf(title);
		if(index > -1){
			titlesFromLocalStorage.splice(index,1);
		}
		window.localStorage.titles = JSON.stringify(titlesFromLocalStorage);
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

/*	function store(){
		window.localStorage.myitems = list.innerHTML;
	}
*/
/*	function retrieve(){
		list.innerHTML = window.localStorage.myitems || '';
	}*/

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
// 	if button.important then toggle class="important" else if button.destroy then remove item from ul and local storage
	function editButton(event){
		var t = event.target,
			parent = findParent(t,'li'),
			parentClass = parent.classList;
		var title = parent.getElementsByTagName('label')[0].innerHTML;

		if(t.tagName === 'BUTTON'){
			if(t.classList.contains('destroy')){
				findParent(t,'ul').removeChild(parent);
				removeTitleFromLocalStorage(title);
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
		//store();
	}
//	will create new editable input which has the same value as before with focus, after Enter pressed adding changes to existing label
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
					//store();
				}
			});
		}
	}

	function toggleEvents(event){
		var t = event.target.tagName;

		list.addEventListener('dblclick', editLabel);
		if(t === 'BUTTON'){ editButton(event); }
		if(t === 'INPUT'){ editInput(event); }
	}

//	will create all list elements based on titles from local storage
	titlesFromLocalStorage.forEach(function(title){
		createListItem(title);
	});

	item.addEventListener('keypress', addElement);
	list.addEventListener('click', toggleEvents);

})();