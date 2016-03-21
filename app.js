	'use strict';
define(['angular','angularRoute','servicemodule','controllers','firstScreen','aboutController','homeController','helpController','bbbbController','ccccController','myconstant1','myfactory2','myprovider1','myprovider2','myservice1','myservice2','myfactory1','myconstant2','myvalue1','myvalue2','directivemodule','mydirective1','mydirective2'],function(angular,angularRoute,servicemodule,controllers,firstScreen,aboutController,homeController,helpController,bbbbController,ccccController,myconstant1,myfactory2,myprovider1,myprovider2,myservice1,myservice2,myfactory1,myconstant2,myvalue1,myvalue2,directivemodule,mydirective1,mydirective2){
	
	angular.module('directiveModule', []);
	var app = angular.module('app',['directiveModule']);
	
	
	app.init = function(){	
		var root = document.getElementsByClassName('demoAPP');
		angular.element(document).ready(function(){
			angular.bootstrap(root,['app']);
		});
	}
	return app;
});