'use strict';
;(function(root,factory){
    //显性的制定依赖
    var angular=window.angular;
    //运行工厂且传入依赖
    factory.call(root,angular);
}(this,function(angular){//工厂的定义
    //定义一个主模块
    angular.module('app',['ngRoute','appControllers','appServices','appDirectives']).
        config(['$routeProvider','$provide','$locationProvider',config]).
        run(['$templateCache',templateCache]);
    //缓存模板
    function templateCache($templateCache){
        $templateCache.put('partials/select.html');
        $templateCache.put('partials/music.html');
        $templateCache.put('partials/text.html');
        $templateCache.put('partials/make.html');
    }
    //路由配置
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