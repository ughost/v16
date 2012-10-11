v16 
===

v16 is a small JavaScript tool for building fast, robust and reliable web applications.. or just cleaning some mess around your project.

## Quick start
Choose one of the following options:
1. download .zip file and unpack it into your project.
2. clone the git repo — `git clone https://github.com/ughost/v16.git` into your project /js directory.

Installation example
____________________
I know.. there is 3 requests for small files, but if you look a little bit closer to it you can find that this is really fine solution.

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

..at the production environment you can merge v16.parts and v16.engine files, but while development better leave it in separated form.

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
	
only one reqired thing is that `myProject` should exist before `v16.starter` without mooving it anywhere from head.

### 2. global parameters getter&setter
there is nothing special to comment here, you can easy use to get&set parameters froum you aplication source anytime

	v16.set('param1', 'value of 1');
	v16.set('param2', 'value of 2');
	
	/* */window.console && console.log(v16.get('param1'));

set&get have one more usefull varioation of use:

	//set few parameters in one call
	v16.set({
		param1 : 'value of 1',
		param2 : 'value of 2'
	});
	
	//get whole parametrs tree (for debug purposes)
	v16.get();