/* 
* @Author: wanghongxin
* @Date:   2015-05-05 17:56:57
* @Last Modified by:   wanghongxin
* @Last Modified time: 2015-05-19 16:46:33
*/

'use strict';
;(function(root,factory){
    var _=window._;
    var $=window.$;
    factory.call(root,angular,_,$);
}(this,function(angular){
    var appControllers=angular.module('appControllers',[]);
    appControllers.
        controller('selectController',['$scope','$routeParams','magaProvider','$rootScope','magasProvider','$http',selectController]).
        controller('makeController',['$scope','$routeParams','magaProvider','$rootScope','magasProvider','$http',makeController]).
        controller('musicController',['$scope','$routeParams','magaProvider','$window','$rootScope','magasProvider','$http',musicController]).
        controller('textController',['$scope','$routeParams','magaProvider','$window','$rootScope','magasProvider',textController]).
        controller('lotteryController',['$scope','$routeParams','magaProvider','$window','$rootScope','magasProvider',lotteryController]).
        controller('hyperLinkController',['$scope','$routeParams','magaProvider','$window','$rootScope','magasProvider',hyperLinkController]);

    function selectController($scope,$routeParams,magaProvider,$rootScope,magasProvider,$http){
        $rootScope.root.bk_color_swift=false;
        $http({
                method:'GET',
                url:'/model/model.json'
            }).
            success(function(data){
                $scope.elements=data;
            });
        $scope.modelId=null;
        $scope.show=function(id,name){
            $('.inputName').removeClass('hide');
            $scope.modelId=id;
            $scope.modelName=name;
        };
        $scope.make=function(modelId,modelName,magazineName){
            magaProvider.modelId=modelId;
            magaProvider.modleName=modelName;
            magaProvider.magazineName=magazineName;
            magasProvider.add();
        };
    }
    function makeController($scope,$routeParams,magaProvider,$rootScope,magasProvider,$http){
        $rootScope.root.bk_color_swift=true;
        $scope.modelName=magaProvider.modelName;
        $scope.modelId=magaProvider.modelId;
        $http({
                method:'GET',
                url:'/model/page/page.json'
            }).
            success(function(data){
                        $scope.imgs=data;
                });
        $scope.swift=magaProvider.swift;
        $scope.control=function(){
            magaProvider.swift=!magaProvider.swift;
            $scope.swift=magaProvider.swift;
        };
    }

    function musicController($scope,$routeParams,magaProvider,$window,$rootScope,magasProvider,$http){
        $rootScope.root.bk_color_swift=true;
        $scope.tempMusic=null;
        $http({
                method:'GET',
                url:'/model/music.json'
            }).
            success(function(data){
                $scope.musics=data;
            });
        $scope.back=function(){
            $window.history.back();
        };
        $scope.setMusic=function(id){
            $scope.tempMusic=id;
        };
        $scope.yes=function(){
            magaProvider.musicName=$scope.tempMusic;
        };
    }

    function textController($scope,$routeParams,magaProvider,$window,$rootScope){
        $rootScope.root.bk_color_swift=true;
        $scope.fn1='字号';
        $scope.fn2='颜色';
        $scope.fn3='背景';
        $scope.placeholder='请输入您要编辑的内容';
        $scope.back=function(){
            $window.history.back();
        };
        $scope.yes=function(){
            if($scope.text){
                magaProvider.texts.push($scope.text);
            }
        };
    }

    function lotteryController($scope,$routeParams,magaProvider,$window,$rootScope){
        $rootScope.root.bk_color_swift=true;
        $scope.back=function(){
            $window.history.back();
        };
        $scope.yes=function(){
            // $scope.back();
        };
    }

    function hyperLinkController($scope,$routeParams,magaProvider,$window,$rootScope){
        // $rootScope.root.bk_color_swift=true;
        $scope.back=function(){
            $window.history.back();
        };
        $scope.yes=function(){
            // $scope.back();
        };
    }
}));