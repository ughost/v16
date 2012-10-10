"use strict";

/**
 * v16.starter - prepare engine environment
 * 
 * @author uGhost
 * @version 1.1
 * 
 * @param {Object} machinery	- engine container
 * @param {Object} engineName	- user reference name
 */

(function (machinery, engineName) {
	var v16 = {};
	
	/**
	 * Main inner data container.
	 * @private
	 */
	v16.data = {};
	
	/**
	 * Bind global methods to the parent object.
	 * Note that: if you change the namespace you must set the same namespace @ v16.engine and use it @ v16.parts
	 * 
	 * @namespace PARENT.ENGINENAME (default: window.v16)
	 */
	machinery[typeof engineName == 'undefined' ? 'v16' : engineName] = {
		/**
		 * Global parameter setter.
		 * @param {string|object} element	- param name | params object
		 * @param {mixed} value				- param value (optional)
		 * @return v16;
		 */
		/*public*/ set : function (/*mixed*/ element, /*mixed*/ value) {
			switch (typeof element) {
				case 'string' : return v16.data[element] = typeof value == 'undefined' ? true : value; break;
				case 'object' : for (var o in element) if (typeof o != 'string') { continue; } else { v16.data[o] = typeof element[o] == 'undefined' ? true : element[o]; } break;
				default : return false;
			}
		},
		
		/**
		 * Global parameter getter.
		 * @param {string} name	- param name
		 * @return {mixed}
		 */
		/*public*/ get : function (/*String*/ element) {
			return typeof element == 'undefined' ? v16.data : v16.data[element];
 		},
		
		/**
		 * Module activator.
		 * @important - after v16.engine.run this method call implementations directly (rewrited by v16.engine)
		 * @param {string} name	- module name
		 * @return v16;
		 */
		/*public*/ use : function (/*String*/ element) {
			switch (typeof element) {
				case 'string' : this.parts.push(element); break;
				case 'object' : for(var m in element) { typeof m == 'string' && this.parts.push(element[m]); } break;
				default : return false;
			}
		},
		
		/**
		 * Static module implementation binding.
		 * @param {string} partName					- module name
		 * @param {function|object} implementation 	- module implementation
		 * @param {boolean} autoInstall 			- automatically add module into init table
		 */
		/*public*/ newPart : function (/*String*/ partName, /*function|object*/ implementation, /*boolean*/autoInstall) {
			var t_partName = typeof partName,
				t_implementation = typeof implementation;
			if ((t_partName == 'undefined' || t_implementation == 'undefined') || t_partName != 'string') return false;
			if (typeof this.partsImpl == 'undefined') this.partsImpl = {};
			
			this.partsImpl[partName] = implementation;
			typeof autoInstall == 'boolean' && autoInstall && this.use(partName);
		},
		
		/**
		 * Module initialization container.
		 * @public
		 */
		parts : [],
		
		VERSION	: "1.0"
	};
})(/*object*/ window /*string*/ /*, "engineName"*/);