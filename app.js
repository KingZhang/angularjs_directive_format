	'use strict';
define(['angular', 'directiveModule', 'formatDirective'],function(angular, directiveModule, formatDirective){
	
	var app = angular.module('app',['directiveModule']);
	
	
	app.init = function(){	
		var root = document.getElementsByClassName('demoAPP');
		angular.element(document).ready(function(){
			angular.bootstrap(root,['app']);
		});
	}
	return app;
});