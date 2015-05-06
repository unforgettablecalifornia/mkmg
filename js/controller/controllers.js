/* 
* @Author: wanghongxin
* @Date:   2015-05-05 17:56:57
* @Last Modified by:   wanghongxin
* @Last Modified time: 2015-05-06 10:52:34
*/

'use strict';
;(function(root,factory){
    factory.call(root,angular);
}(this,function(angular){
    var appControllers=angular.module('appControllers',[]);
    appControllers.
        controller('homeController',['$scope',
                function($scope){

                }
            ]).
        controller('detailController',['$scope','$routeParams','_Phone',
                function($scope,$routeParams,_Phone){
                    $scope.id=$routeParams.id;
                    console.log(_Phone);
                }
            ])

}));