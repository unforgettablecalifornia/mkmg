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
            var newMaga=new magaProvider;
            magasProvider.addMaga(newMaga);//增加一个杂志
            $(window).off('touchmove.scroll',$scope.controller);
        };
    }

    //制作页面控制器
    function makeController($scope,$routeParams,magaProvider,$rootScope,magasProvider,$http){
        // console.log(magasProvider)
        // magasProvider.listen();
        
        var newMaga=magasProvider.getNewMaga();
        $scope.pages=newMaga.pages;
        $scope.active=newMaga.active;
        $scope.$watchCollection('imgs',
            function(newVal,oldVal,scope){
                // console.log(newVal);
                // console.log(oldVal);
                // console.log(scope);
            });
        $scope.modelName=magaProvider.modelName;
        $scope.modelId=magaProvider.modelId;
        $scope.copyPage=function(){
            $scope.pages.splice($scope.active+1,0,$scope.pages[$scope.active]);
            $scope.active++;
            newMaga.active++;
        }
        $scope.deletePage=function(){
            $scope.pages.splice($scope.active,1);
            if($scope.active===$scope.pages.length){
                $scope.active--;
                newMaga.active--;
            }
        }
        $scope.addPage=function(){
            newMaga.addPage();
            $scope.active=newMaga.active;
        }
        $http({
                method:'GET',
                url:'model/page/page.json'
            }).
            success(function(data){
                        if(!newMaga.pages[0]){//制作页面读取远程数据,生成第一页
                            $scope.pages[0]=newMaga.pages[0]=data;
                            $scope.active=0;
                            newMaga.active=0;

                        }
                
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
	/*	$scope.color = 30;
		$scope.font_size = 60;
		$scope.font_color = 60;
		$scope.radius = 20;*/
		
		
	 $scope.loadData1 = function(){

		$scope.fontSize = parseInt($scope.sacle * $scope.fontsize_max + $scope.fontsize_min)  ;
	    
	
    }
	 $scope.loadData2 = function(){

		$scope.radius = parseInt($scope.sacle * $scope.radius_max + $scope.radius_min)  ;
		
		
		
    }

		
    }
}));