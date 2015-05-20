'use strict';
;(function(root,factory){
    var angular=window.angular;
    var Math=window.Math;
    factory.call(root,angular,Math);
}(this,function(angular){
    angular.module('appDirectives',[]).
        directive('dragDirective',dragDirective).
        directive('cropperDirective',cropperDirective).
        directive('dragSetDirective',dragSetDirective);
    //拖拽指令
    function dragDirective(){
        return {
            scope:{},
            restrict:'A',
            link:function(scope,ele,attrs){
                ele=$(ele[0]).find('.s-edit-btn');
                var width=ele.children().children().width(),
                    wrapperWidth=width*7,
                    touchPos={
                    startX:0,
                    x:0,
                    deltaX:0
                };
                ele.css({
                    'webkitTransition':'all ease 0.5s',
                    'transition':'all ease 0.5s',
                    '-webkit-transition':'all ease 0.5s'
                });
                ele.on('touchstart',sometime);
                ele.on('touchmove',drag);
                function sometime(e){
                    touchPos.startX=e.touches[0].pageX;
                }
                function drag(e){
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
                }
            }
        }
    };
    //图片截取指令
    function cropperDirective(){
        return {
            scope:{
                pos:'@'
            },
            restrict:'A',
            templateUrl:'/partials/cropper.html',
            transclude:true,
            link:function(scope,ele,attrs){
                    var ele=$(ele[0]),
                        closeAnimation=$('.clear-animation'),//清除动画按钮
                        animationOperate=$('.animation-operate'),//动画编辑浮层
                        stageNav=$('.stage-nav'),//导航浮层
                        fadeInBtn=$('.fadeInBtn'),//淡入按钮
                        fadeOutBtn=$('.fadeOutBtn'),//淡出按钮
                        amplifyBtn=$('.amplifyBtn'),//放大按钮
                        rotationBtn=$('.rotationBtn'),//旋转按钮
                        shakeBtn=$('.shakeBtn');//抖动按钮
                    init();
                    function init(){
                        if(!closeAnimation.data('only')){
                            closeAnimation.data('only', true);
                            closeAnimation.on('tap',closeAnimationLayer);
                            fadeInBtn.on('tap',addAnimation.bind(ele,'at-fadeIn'));
                            fadeOutBtn.on('tap',addAnimation.bind(ele,'at-fadeOut'));
                            amplifyBtn.on('tap',addAnimation.bind(ele,'at-amplify'));
                            rotationBtn.on('tap',addAnimation.bind(ele,'at-rotation'));
                            shakeBtn.on('tap',addAnimation.bind(ele,'at-shake'));  
                        }
                        ele.on('longTap',showCropperLayer);
                        ele.find('.anim').on('tap',showAnimationLayer);
                        ele.find('.del').on('tap',delActive);
                    }


                    function addAnimation(effectName){
                        $('.active').addClass(effectName);
                    }
                    function showCropperLayer(){
                        var parent=ele.parent();
                        var siblings=parent.find('.active');
                        siblings.removeClass('active');
                        ele.addClass('active');
                        scope.$apply(function(){
                            
                        });
                    }

                    function showAnimationLayer(){
                        animationOperate.removeClass('hide');
                        stageNav.addClass('hide');
                    }
                    function closeAnimationLayer(){
                        animationOperate.addClass('hide');
                        stageNav.removeClass('hide');
                        console.log(stageNav)
                    }

                    function delActive(){
                        $('.active').remove();
                        closeAnimation.trigger('tap');
                    }
                }
        }
    }
    // 拖拽设置值指令
    function dragSetDirective(){
        return {
            scope:{},
            link:function(scope,ele,attrs){
                var ele=$(ele[0]),
                    setLine=ele.find('.set-line'),
                    setBtn=ele.find('.set-btn'),
                    setLineWidth=setLine.width(),
                    eleWidth=ele.width(),
                    values=ele.find('.values span'),
                    pos={
                        startX:0,
                        moveX:0,
                        endX:0,
                        deltaX:0,
                        now:0
                    };
                setBtn.on('touchstart',sometime);
                
                function sometime(e){
                    ele.on('touchmove',drag);
                    ele.on('touchend',drop);
                    var now=parseInt(setBtn.css('left'));
                    pos.now=now;
                    pos.startX=e.touches[0].pageX;

                }  
                function drag(e){
                    pos.moveX=e.touches[0].pageX;
                    pos.deltaX=e.touches[0].pageX-pos.startX;
                    var value=pos.now+pos.deltaX;
                    if(value<0){
                        value=0;
                    }else if(value>setLineWidth){
                        value=setLineWidth;
                    }
                    setBtn.css({
                            'left':value+'px'
                        });
                    values.html(parseFloat(value/setLineWidth*10).toFixed(1));
                }

                function drop(e){
                    $(this).off(drop);
                }
            }
        };
    }
}));
