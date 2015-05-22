'use strict';
;(function(root,factory){
    var _=window._;
    var $=window.$;
    var angular=window.angular;
    factory.call(root,angular,_,$);
}(this,function(angular){
    var appControllers=angular.module('appControllers',[]);
    appControllers.
        controller('selectController',['$scope','$routeParams','magaProvider','$rootScope','magasProvider','$http',selectController]).
        controller('makeController',['$scope','$routeParams','magaProvider','$rootScope','magasProvider','$http',makeController]).
        controller('musicController',['$scope','$routeParams','magaProvider','$window','$rootScope','magasProvider','$http',musicController]).
        controller('textController',['$scope','$routeParams','magaProvider','$window','$rootScope','magasProvider',textController]).
        controller('lotteryController',['$scope','$routeParams','magaProvider','$window','$rootScope','magasProvider','$http',lotteryController]).
        controller('hyperLinkController',['$scope','$routeParams','magaProvider','$window','$rootScope','magasProvider',hyperLinkController]);
    //选择模板页面控制器    
    function selectController($scope,$routeParams,magaProvider,$rootScope,magasProvider,$http){
        $http({
                method:'GET',
                url:'model/model.json'
            }).
            success(function(data){
                $scope.elements=data;//远程读取页面数据
            });
        $scope.modelId=null;//用户选择的模板编号
        $scope.controller=function(){
            return false;
        }
        $scope.show=function(id,name){//弹出对话框
            $('.inputName').removeClass('hide').addClass("sZoom");
            $scope.modelId=id;
            $scope.modelName=name;
            $(window).on('touchmove.scroll',$scope.controller);
        };
        $scope.make=function(modelId,modelName,magazineName){
            //用户从对话框进入下个页面
            magaProvider.modelId=modelId;//模板编号放入当前杂志服务
            magaProvider.modleName=modelName;
            magaProvider.magazineName=magazineName;
            magasProvider.add();//增加一个杂志
            $(window).off('touchmove.scroll',$scope.controller);
        };
    }

    //制作页面控制器
    function makeController($scope,$routeParams,magaProvider,$rootScope,magasProvider,$http){
        $scope.modelName=magaProvider.modelName;
        $scope.modelId=magaProvider.modelId;
        $http({
                method:'GET',
                url:'model/page/page.json'
            }).
            success(function(data){
                        $scope.imgs=data;//制作页面读取远程数据
                });
        $scope.swift=magaProvider.swift;//功能菜单的切换
        $scope.control=function(){
            magaProvider.swift=!magaProvider.swift;
            $scope.swift=magaProvider.swift;
        };
    }

    //音乐页面控制器
    function musicController($scope,$routeParams,magaProvider,$window,$rootScope,magasProvider,$http){
        $scope.tempMusic=null;
        $http({
                method:'GET',
                url:'model/music.json'
            }).
            success(function(data){
                $scope.musics=data;
            });
        //点击返回
        $scope.back=function(){
            $window.history.back();
        };
        //选取音乐
        $scope.setMusic=function(id){
            $scope.tempMusic=id;
        };
        //点击完成
        $scope.yes=function(){
            magaProvider.musicName=$scope.tempMusic;
        };
    }

    //编辑文本页面控制器
    function textController($scope,$routeParams,magaProvider,$window,$rootScope){
        //点击返回
        $scope.back=function(){
            $window.history.back();
        };
        //点击完成
        $scope.yes=function(){
            if($scope.text){
                magaProvider.texts.push($scope.text);
            }
        };
		
		$scope.font = 60;
		$scope.color = 30;
		$scope.backgound = 20;
    }

    //涂抹页面控制器
    function lotteryController($scope,$routeParams,magaProvider,$window,$rootScope,magasProvider,$http){
        //点击返回
        $scope.back=function(){
            $window.history.back();
        };
        //点击完成
        $scope.yes=function(){
            // $scope.back();
        };
		
		$scope.show = false;
		$scope.column = ["15%","30%","60%"];
		function getthis(n)
		{
			$scope.act=n;	
		}
		$scope.getthis=getthis;
		
		$scope.effects=null;
        $http({
                method:'GET',
                url:'model/lottery.json'
            }).
            success(function(data){
                $scope.effects=data;
				$scope.this_effects = $scope.effects[0].name;
        });
		

		
		$scope.choose=function(index){
			$scope.this_effects=$scope.effects[index].name;
			$scope.show = false;
		}
		
    }

    //超链接页面控制器
    function hyperLinkController($scope,$routeParams,magaProvider,$window,$rootScope){
        //点击返回
        $scope.back=function(){
            $window.history.back();
        };
        //点击完成
        $scope.yes=function(){
            // $scope.back();
        };
		$scope.color = 30;
		$scope.font_size = 60;
		$scope.font_color = 60;
		$scope.radius = 20;
    }
}));