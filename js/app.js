/* 
* @Author: wanghongxin
* @Date:   2015-05-05 17:49:10
* @Last Modified by:   wanghongxin
* @Last Modified time: 2015-05-06 11:44:50
*/

'use strict';
;(function(root,factory){
    factory.call(root,angular);
}(this,function(angular){
    var app=angular.module('app',['ngRoute','appControllers']);
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
    app.factory('_Phone',
            function(){
                // var _artist='';
                // var service={};
                // service.getArtist=function(){
                //     return _artist;
                // };

                // return service;
                var _private='wanghongxin';
                var _getArtist=function(){
                    return _private;
                };
                return {
                    getArtist:_getArtist
                };
            }
        );
}));
//factory方法注册了一个服务，我们以_空间表明这是自定义服务以区别$空间的内置服务;
//然后我们注入我们的类，这是一个典型的闭包，有自己的私有属性和私有函数，然后返回一个对象，这个对象当然可以调用这个闭包的私有属性和私有方法，私有方法get私有属性；