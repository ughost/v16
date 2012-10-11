v16 
===

v16 is a small automotive themed JavaScript tool for building fast, robust and reliable web applications.. or just cleaning some mess around your project.

## Quick start
Choose one of the following options:
 # download .zip file and unpack it into your project.
 # clone the git repo — `git clone https://github.com/ughost/v16.git` into your project /js directory.

## Installation example

I know.. there is 3 requests for small files, but if you look a little bit closer to it you can find that this is really fine solution.
..and lightweight one (`v16.starter.min` + `v16.engine.min` = ~2KB)

	<!DOCTYPE HTML>
	<html lang="en-US">
		<head>
			<meta charset="UTF-8">
			<title>v16 EXAMPLE</title>
			
			<script src="/js/lib/v16.starter.js"></script>
		</head>
		<body>
			<div>
				CONTENT
			</div>
			
			<script src="/js/lib/v16.parts.js"></script>
			<script src="/js/lib/v16.engine.js"></script>
		</body>
	</html>

..at the production environment you can merge `v16.parts` and `v16.engine` files, but while development better leave it in the separated form.

## Features
### 1. easy bind possibility into your existing structure of project
that allows you to call it on this way (by default): `v16.use(['partA', 'partB']);`
..or this way: `myProject.dispatcher.use(['partA', 'partB']);`

To set it edit last line of: `v16.starter` and `v16.engine` and change it from:

	/* ... */
	})(/*object*/ window /*string*/ /*, "engineName"*/);
	
(which defines default namespace: `window.v16`), to something like that:

	/* ... */
	})(myProject, 'dispatcher');
	
only one reqired thing is that `myProject` should exist before `v16.starter` without moving it anywhere from head.

### 2. global parameters getter&setter
there is nothing special to comment here, you can easy use to get&set parameters froum you aplication source anytime

	v16.set('param1', 'value of 1');
	v16.set('param2', 'value of 2');
	
	/* */window.console && console.log(v16.get('param1'));

set&get have one more usefull variation of use:

	//set few parameters in one call
	v16.set({
		param1 : 'value of 1',
		param2 : 'value of 2'
	});
	
	//get whole parametrs tree (for debug purposes)
	v16.get();
	
### 3. parts declatarion
The most important elements of each engine are parts - so we need to declare implementation of each one by using `.newPart()` in (or some other) `v16.parts` file, like that:

	v16.newPart('mainSlider', function () {
		/* slider implementation */
	});
	
after that we just need to `.use()` it (looka: next chapter) if it needed.

Parts can also use itself automatically after engine initialization. To do that just set the third parameter of it declaration to `true`, f.e.:

	v16.newPart('mainMenu', function () {
		/* implementation of element available on each page */
	}, true);
	
### 4. using parts
If you want to use some parts declared in `v16.parts` only thing you'll need is to call it from the source of your document like that:

	<div id="mainSlider">
		<ul class="slides"><!-- ... --></ul>
		<ol class="pagination"></ol>
		
		<script> v16.use('mainSlider'); </script>
	</div>
	
..or like that:

	v16.use(['mainSlider', 'footerSlider']);

This feature builds stack of parts and mount each of it in the order of use `.use()`.

Important:
 - 1 call = 1 call, so if you use some part couple times the engine call it couple times after start (it usefull too).
 - parts called by `.use()` after the engine starts (f.e. to bind some AJAX responses) will be started immediately.
 - stack can be increased while the engine starts so one part can use another one. But remember if you paste smth in the stack it'll be called as last element of the stack or.. immediately because the engine can could finish start process.
 - if engine found some part which declaration typeof !== 'function' it will call each of method of this object (ftw? todo: new part()).
 
### 5. gears
This can be usefull when you want to call some part after redirect without any dirty tricks.

Gears got simple structure (like the other features ;)) where name of a gear is that what you must set in activator to "roll the gear" - in this case activator is `location.hash`, look at the definition of extremely useful feature:
	
	v16.newGear('thankYou', function () {
		window.alert('Thank you for smth! :)');
	});

..this `gear` appears once after it declaration and will be dismount after the "roll". So if you redirect user to f.e.: `http://example.com/#thankYou` it'll "roll" and dismount after it.

You can automatically remount the gear after it's roll by adding 3rd parameter to it declaration:
	
	v16.newGear('signIn', function () {
		/* show signIn popup.. or smth */
	});

..so each time when you set `location.hash` to "#signIn" you roll that gear.

The only problem in this feature is situation when your browser doesn't allow to use `onhashchange` event and your gear uses "re mount" option. After find the right gear by activator `location.hash` will be changed into "gearName" + "_" - so user can have some troubles to use browsers "back" functionality. So.. for now if you want to build rich JS application where's location history is one of the most important parts for now you'll need to use another library for it (`jQuery.history` or smth). Till the next version of `v16`.. ;)
 
## TADA!
Simple - huh? :)