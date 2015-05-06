/* 
* @Author: wanghongxin
* @Date:   2015-05-05 17:49:10
* @Last Modified by:   wanghongxin
* @Last Modified time: 2015-05-06 10:52:08
*/

'use strict';
;(function(root,factory){
    factory.call(root,angular);
}(this,function(angular){
    var Phone=function(){
        this.$get=function(){
            return {
                'Phone':123
            }
        }
    };
    var app=angular.module('app',['ngRoute','appControllers'],
            function($provide){
                $provide.provider('_Phone',Phone)
            }
        );
    app.config(['$routeProvider',
            function($routeProvider){
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