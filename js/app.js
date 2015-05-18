/* 
* @Author: wanghongxin
* @Date:   2015-05-05 17:49:10
* @Last Modified by:   wanghongxin
* @Last Modified time: 2015-05-18 17:21:42
*/

'use strict';
;(function(root,factory){
    factory.call(root,angular);
}(this,function(angular){
    angular.module('app',['ngRoute','appControllers','appServices']).
        config(['$routeProvider','$provide','$locationProvider',config]).
        run(['$templateCache',templateCache]);

    function templateCache($templateCache){
        $templateCache.put('partials/select.html');
        $templateCache.put('partials/music.html');
        $templateCache.put('partials/text.html');
        $templateCache.put('partials/make.html');
    }

    function config($routeProvider,$provide,$locationProvider){
        $routeProvider.
            when('/',{
                templateUrl:'partials/select.html',
                controller:'selectController'
            }).
            when('/make/:id',{
                templateUrl:'partials/make.html',
                controller:'makeController'
            }).
            when('/make/:id/music',{
                templateUrl:'partials/music.html',
                controller:'musicController'
            }).
            when('/make/:id/text',{
                templateUrl:'partials/text.html',
                controller:'textController'
            }).
            when('/make/:id/lottery',{
                templateUrl:'partials/lottery.html',
                controller:'lotteryController'
            }).
            when('/make/:id/hyperLink',{
                templateUrl:'partials/hyperLink.html',
                controller:'hyperLinkController'
            });
        
    }
}));