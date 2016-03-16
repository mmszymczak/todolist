describe('Store module', function(){
	'use strict';

	beforeAll(function(){
		var array = [];
		if(window.localStorage.toDoDB){
			array = JSON.parse(window.localStorage.toDoDB); 
		}
		var store = new app.Store(array);
	});

	it("localStorage should exists", function(){
		expect(localStorage["todoDB"]).toEqual(jasmine.arrayContaining([]));
	})

	describe("Constructor", function(){

		it("should have constructor", function(){
			expect(app.Store).toEqual(jasmine.any(Function));
		});

		it("constructor should get reference to array", function(){
			spyOn(app, "Store").and.callThrough();
			new app.Store([]);
			expect(app.Store).toHaveBeenCalledWith(jasmine.any(Array));
		});

		it("should return fail if not array", function(){			
			expect(function(){ 
				new app.Store(undefined);
			}).toThrowError("Array please");
		});

		it("should assign array to the this.array proper", function(){
			var arr = [];
			var variab = new app.Store(arr);
			expect(variab["array"]).toBe(arr);
		});

	});

	describe("removeObjectFromLocalStorage function", function(){

		it("should exists", function(){
			var variab = new app.Store([]);	
			expect(variab.addObjectToLocalStorage).toEqual(jasmine.anything());
		});

		it("shuld get object", function(){
			var variab = new app.Store([]);	
			spyOn(variab, "addObjectToLocalStorage").and.callThrough();
			variab.addObjectToLocalStorage({});
			expect(variab.addObjectToLocalStorage).toHaveBeenCalledWith(jasmine.any(Object));
		});

	});

	describe("removeObjectFromLocalStorage function", function(){

		it("should exists", function(){
			var variab = new app.Store([]);	
			expect(variab.removeObjectFromLocalStorage).toEqual(jasmine.anything());
		});

		it("shuld get number", function(){
			var variab = new app.Store([]);	
			spyOn(variab, "removeObjectFromLocalStorage").and.callThrough();
			variab.removeObjectFromLocalStorage(12345);
			expect(variab.removeObjectFromLocalStorage).toHaveBeenCalledWith(jasmine.any(Number));
		});

	});
});