"use strict";

/**
 * v16.engine - manage active parts
 * 
 * @author uGhost
 * @version 1.2
 * 
 * @param {Object} machinery	- engine container
 * @param {Object} engineName	- user reference name
 */

(function (machinery, engineName) {
	var v16 	= machinery[typeof engineName == 'undefined' ? 'v16' : engineName],
		engine 	= {};
	
	engine.installPart = function (/*string|object*/ part) {
		switch (typeof part) {
			case 'object' : for (var element in part) engine.installPart(part[element]); break;
			case 'string' :
				switch (typeof v16.partsImpl[part]) {
					case 'function' : return v16.partsImpl[part](); break;
					case 'object' 	: return typeof v16.partsImpl[part].init != 'undefined' ? v16.partsImpl[part].init() : false; break;
					default : return false;
				}
				break;
			default : return false;
		}
	};
	
	engine.run = function () {
		//rewrite standard collector
		v16.use = engine.installPart;
		
		console.log(v16.gearsImpl);
		
		return !!v16.parts.length && engine.installPart(v16.parts); //wrooom
	};
	
	var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            engine.run();
            clearInterval(readyStateCheckInterval);
        }
    }, 10);
})(/*object*/ window /*string*/ /*, "engineName"*/);