"use strict";

/**
 * v16.parts - declaration of engine parts
 * 
 * @author uGhost
 * @version 1.2
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
