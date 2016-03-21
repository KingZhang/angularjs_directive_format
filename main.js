'use strict';
require.config({
	paths:{
		'angular' :'libs/angular' ,
		'app' :'app' ,
		'directiveModule' : 'directives/directiveModule',
		'formatDirective': 'formatDirective'
	},
	shim :{
		'app' : { 
			deps:['angular']
		},
		"angular":{
			exports:"angular"
		}	
		
	}
});

require(['app'],function(app){
	app.init();
});