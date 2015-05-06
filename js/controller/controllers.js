/* 
* @Author: wanghongxin
* @Date:   2015-05-05 17:56:57
* @Last Modified by:   wanghongxin
* @Last Modified time: 2015-05-06 11:58:24
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
        controller('detailController',['$scope','$routeParams','_phone',
                function($scope,$routeParams,_phone){
                    $scope.id=$routeParams.id;
                    console.log(_phone);
                }
            ])

}));