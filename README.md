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
### 1. bind possibility into your existing structure of project
 	
 	that alows you to cal it on this way (by default): v16.use(['partA', 'partB']);
 	..or this way: myProject.dispatcher.use(['partA', 'partB']);
 	
### 2. set & get global parameters