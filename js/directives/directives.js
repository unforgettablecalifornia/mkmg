/* 
* @Author: wanghongxin
* @Date:   2015-05-05 17:56:42
* @Last Modified by:   wanghongxin
* @Last Modified time: 2015-05-19 10:52:34
*/
'use strict';
;(function(root,factory){
    var angular=window.angular;
    factory.call(root,angular);
}(this,function(angular){
    angular.module('appDirectives',[]).
        directive('dragDirective',dragDirective);

    function dragDirective(){
        return {
            scope:{},
            restrict:'A',
            link:function(scope,ele,attrs){
                ele=$(ele[0]);
                var width=ele.children().children().width()*7;
                var touchPos={
                    startX:0,
                    x:0,
                    endX:0
                };
                var wrapperPos={
                    x:0
                }
                ele.on('touchstart',function(e){
                    touchPos.startX=e.touches[0].pageX;
                    console.log(touchPos.startX)
                });
                ele.on('touchmove',function(e){
                    console.log('a')
                });
            }
        }
    };
}));
