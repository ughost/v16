"use strict";

/**
 * File for messy stuff like parts, gears, etc.
 * 
 * @author uGhost
 * @version 1.2
 * 
 * @requires v16.starter
 */

v16.newPart('jsExistTest', function () {
    $('html').removeClass('no-js').addClass('js');
}, true);

v16.newPart('useMe', function () {
	/* */window.console && console.log('the piece of code called "useMe" was used!');
});

v16.newGear('signin', function () {
    /* */window.console && console.log('#signin activated! :D');
})
