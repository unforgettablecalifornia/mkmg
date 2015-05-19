'use strict';
;(function(root,factory){
    var angular=window.angular;
    var Math=window.Math;
    factory.call(root,angular,Math);
}(this,function(angular){
    angular.module('appDirectives',[]).
        directive('dragDirective',dragDirective);

    function dragDirective(){
        return {
            scope:{},
            restrict:'A',
            link:function(scope,ele,attrs){
                ele=$(ele[0]).find('.s-edit-btn');
                var width=ele.children().children().width();
                var wrapperWidth=width*7;
                var touchPos={
                    startX:0,
                    x:0,
                    deltaX:0
                };
                ele.css({
                    'webkitTransition':'all ease 0.5s',
                    'transition':'all ease 0.5s',
                    '-webkit-transition':'all ease 0.5s'
                });
                ele.on('touchstart',function(e){
                    touchPos.startX=e.touches[0].pageX;
                });
                ele.on('touchmove',function(e){
                    touchPos.x=e.touches[0].pageX;
                    touchPos.deltaX=touchPos.x-touchPos.startX;
                    if(Math.abs(touchPos.deltaX)>100){
                        if(touchPos.deltaX>0){
                            ele.css({
                                    'webkitTransform':'translate(0,0)',
                                    'transform':'translate(0,0)',
                                    '-webkit-transform':'translate(0,0)'
                                });
                        }else{
                            ele.css({
                                    'webkitTransform':'translate(-'+width+'px,0)',
                                    'transform':'translate(-'+width+'px,0)',
                                    '-webkit-transform':'translate(-'+width+'px,0)'
                                });
                        }
                    }
                });
                ele.on('touchend',function(e){
                    
                });
            }
        }
    };
}));
