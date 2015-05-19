/* 
* @Author: wanghongxin
* @Date:   2015-05-05 17:56:57
* @Last Modified by:   wanghongxin
* @Last Modified time: 2015-05-19 13:11:11
*/

'use strict';
;(function(root,factory){
    factory.call(root,angular);
}(this,function(angular){
    var appControllers=angular.module('appControllers',[]);
    appControllers.
        controller('selectController',['$scope','$routeParams','magaProvider','$rootScope',selectController]).
        controller('makeController',['$scope','$routeParams','magaProvider','$rootScope',makeController]).
        controller('musicController',['$scope','$routeParams','magaProvider','$window','$rootScope',musicController]).
        controller('textController',['$scope','$routeParams','magaProvider','$window','$rootScope',textController]).
        controller('lotteryController',['$scope','$routeParams','magaProvider','$window','$rootScope',lotteryController]).
        controller('hyperLinkController',['$scope','$routeParams','magaProvider','$window','$rootScope',hyperLinkController]);

    function selectController($scope,$routeParams,magaProvider,$rootScope){
        $rootScope.root.bk_color_swift=false;
        $scope.title='选择素材';
        $scope.button='返回';
        $scope.elements=[
                {
                    src:'img/img-default.jpg',
                    name:'自定义',
                    id:1
                },
                {
                    src:'img/img01.jpg',
                    name:'莫负时光',
                    id:2
                },
                {
                    src:'img/img01.jpg',
                    name:'莫负时光',
                    id:3
                },
                {
                    src:'img/img01.jpg',
                    name:'莫负时光',
                    id:4
                },
                {
                    src:'img/img01.jpg',
                    name:'莫负时光',
                    id:5
                },
                {
                    src:'img/img01.jpg',
                    name:'莫负时光',
                    id:6
                },
                {
                    src:'img/img01.jpg',
                    name:'莫负时光',
                    id:7
                },
                {
                    src:'img/img01.jpg',
                    name:'莫负时光',
                    id:8
                }
            ];
        $scope.id=null;
        $scope.show=function(id,name){
            $('.inputName').removeClass('hide');
            $scope.id=id;
            $scope.name=name;
        };
        $scope.make=function(id,name,magazineName){
            magaProvider.id=id;
            magaProvider.name=name;
            magaProvider.magazineName=magazineName;
        };
    }
    function makeController($scope,$routeParams,magaProvider,$rootScope){
        $rootScope.root.bk_color_swift=true;
        $scope.buttonLeft="返回";
        $scope.buttonRight="预览";
        $scope.name=magaProvider.name;
        $scope.id=magaProvider.id;
        $scope.imgs=[
                {
                    src:'img/img03.jpg'
                },
                {
                    src:'img/img02.jpg'
                },
                {
                    src:'img/img02.jpg'
                }
            ];
        $scope.swift=magaProvider.swift;
        $scope.control=function(){
            magaProvider.swift=!magaProvider.swift;
            $scope.swift=magaProvider.swift;
        };
    }

    function musicController($scope,$routeParams,magaProvider,$window,$rootScope){
        $rootScope.root.bk_color_swift=true;
        $scope.buttonLeft="返回";
        $scope.buttonRight="完成";
        $scope.tempMusic=null;
        $scope.musics=[
            {
                type:'无音乐',
                list:[
                    {
                        musicId:1,
                        musicName:'飞'
                    },
                    {
                        musicId:2,
                        musicName:'飞飞'
                    },
                    {
                        musicId:3,
                        musicName:'飞飞飞'
                    }
                ]
            },
            {
                type:'动感',
                list:[
                    {
                        musicId:1,
                        musicName:'飞'
                    },
                    {
                        musicId:2,
                        musicName:'飞飞'
                    },
                    {
                        musicId:3,
                        musicName:'飞飞飞'
                    }
                ]
            },
            {
                type:'动感',
                list:[
                    {
                        musicId:1,
                        musicName:'飞'
                    },
                    {
                        musicId:2,
                        musicName:'飞飞'
                    },
                    {
                        musicId:3,
                        musicName:'飞飞飞'
                    }
                ]
            },

        ];
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
        $scope.buttonLeft="返回";
        $scope.buttonRight="完成";
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
        $scope.buttonLeft="返回";
        $scope.buttonRight="完成";
        $scope.back=function(){
            $window.history.back();
        };
        $scope.yes=function(){
            // $scope.back();
        };
    }

    function hyperLinkController($scope,$routeParams,magaProvider,$window,$rootScope){
        // $rootScope.root.bk_color_swift=true;
        $scope.buttonLeft="返回";
        $scope.buttonRight="完成";
        $scope.back=function(){
            $window.history.back();
        };
        $scope.yes=function(){
            // $scope.back();
        };
    }
}));