/* 
* @Author: wanghongxin
* @Date:   2015-05-05 17:56:57
* @Last Modified by:   wanghongxin
* @Last Modified time: 2015-05-07 15:22:11
*/

'use strict';
;(function(root,factory){
    factory.call(root,angular);
}(this,function(angular){
    var appControllers=angular.module('appControllers',[]);
    // appControllers.config(['phoneProvider',
    //         function(phoneProvider){
    //             phoneProvider.setLover('ztt3');
    //         }
    //     ]);
    appControllers.
        controller('homeController',['$scope',
                function($scope){

                }
            ]).
        controller('detailController',['$scope','$routeParams','phoneProvider','phoneFactory','phoneService','keyConstant','keyValue',
                function($scope,$routeParams,phoneProvider,phoneFactory,phoneService,keyConstant,keyValue){
                    $scope.id=$routeParams.id;
                    console.log(phoneService,phoneService.getLover());
                    phoneService.setLover('zttztt');
                    console.log(keyValue);
                }
            ]);

}));