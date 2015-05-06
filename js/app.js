/* 
* @Author: wanghongxin
* @Date:   2015-05-05 17:49:10
* @Last Modified by:   wanghongxin
* @Last Modified time: 2015-05-06 17:02:19
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
    app.service('_phone',
            function(){
                var _artist='wanghongxin';
                var _getArtist=function(){
                    return _artist;
                };
                this.getArtist=_getArtist;
                //new 不需要显示的return 如果显示的return会覆盖new的return;
            }
        );
}));
//service和factory的区别就是一个是constructor，一个是closure;
//closure函数执行完毕后，closure上下文是不会销毁的，constructor的呢？