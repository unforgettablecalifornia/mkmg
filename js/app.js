/* 
* @Author: wanghongxin
* @Date:   2015-05-05 17:49:10
* @Last Modified by:   wanghongxin
* @Last Modified time: 2015-05-07 14:57:33
*/

'use strict';
;(function(root,factory){
    factory.call(root,angular);
}(this,function(angular){
    var app=angular.module('app',['ngRoute','appControllers','appServices']);
    app.config(['$routeProvider',
            function($routeProvider,phoneProvider){
                $routeProvider.
                    when('/home',{
                        templateUrl:'partials/home.html',
                        controller:'homeController'
                    }).
                    when('/detail/:id',{
                        templateUrl:'partials/detail.html',
                        controller:'detailController'
                    }).
                    otherwise({
                        redirectTo:'/home'
                    });
            }

        ]);
}));