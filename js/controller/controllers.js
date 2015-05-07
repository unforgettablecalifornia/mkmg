/* 
* @Author: wanghongxin
* @Date:   2015-05-05 17:56:57
* @Last Modified by:   wanghongxin
* @Last Modified time: 2015-05-07 13:55:41
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
        controller('detailController',['$scope','$routeParams','phoneProvider','phoneFactory','phoneService',
                function($scope,$routeParams,phoneProvider,phoneFactory,phoneService){
                    $scope.id=$routeParams.id;
                    console.log(phoneService,phoneService.getLover());
                    phoneService.setLover('zttztt');
                }
            ]);

}));