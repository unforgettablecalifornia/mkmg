/* 
* @Author: wanghongxin
* @Date:   2015-05-05 17:49:10
* @Last Modified by:   wanghongxin
* @Last Modified time: 2015-05-19 15:34:27
*/

'use strict';
;(function(root,factory){
    var angular=window.angular;
    factory.call(root,angular);
}(this,function(angular){
    angular.module('app',['ngRoute','appControllers','appServices','appDirectives']).
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
            when('/make/:modelId',{
                templateUrl:'partials/make.html',
                controller:'makeController'
            }).
            when('/music',{
                templateUrl:'partials/music.html',
                controller:'musicController'
            }).
            when('/text',{
                templateUrl:'partials/text.html',
                controller:'textController'
            }).
            when('/lottery',{
                templateUrl:'partials/lottery.html',
                controller:'lotteryController'
            }).
            when('/hyperLink',{
                templateUrl:'partials/hyperLink.html',
                controller:'hyperLinkController'
            });
        
    }
}));