/* 
* @Author: wanghongxin
* @Date:   2015-05-05 17:56:42
* @Last Modified by:   wanghongxin
* @Last Modified time: 2015-05-14 18:11:52
*/
'use strict';
;(function(root,factory){
    factory.call(root,angular);
}(this,function(angular){
    angular.module('appServices',[]).
        provider('magaProvider',magaProvider);

    function magaProvider(){
        var _artist='wanghongxin';
        return {
            $get:function(){
                return {
                    swift:true,
                    texts:[]
                };
            },
            setLover:function(lover){
                _lover=lover;
            }
        }
    };
}));


