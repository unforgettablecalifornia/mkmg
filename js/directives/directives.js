'use strict';
;(function(root,factory){
    var angular=window.angular;
    var Math=window.Math;
    factory.call(root,angular,Math);
}(this,function(angular){
    angular.module('appDirectives',[]).
        directive('dragXDirective',dragXDirective).
        directive('cropperDirective',cropperDirective).
        directive('dragSetDirective',dragSetDirective).
		directive('btn',btn).
        directive('myScroll',myScroll);
    //制作页面导航拖拽
    function dragXDirective(){
        return {
            scope:{},
            restrict:'A',
            link:function(scope,ele,attrs){
                ele=$(ele[0]).find('.s-edit-btn');
                var width=ele.children().children().width()+10,
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
            // scope:{
            //     pos:'@'
            // },
            restrict:'A',
            templateUrl:'partials/cropper.html',
            transclude:true,
            link:function(scope,ele,attrs){
                    var ele=$(ele[0]),
                        stage_bj=$('.stage_bj')[0],
                        closeAnimation=$('.clear-animation'),//清除动画按钮
                        animationOperate=$('.animation-operate'),//动画编辑浮层
                        stageNav=$('.stage-nav'),//导航浮层
                        fadeInBtn=$('.fadeInBtn'),//淡入按钮
                        fadeOutBtn=$('.fadeOutBtn'),//淡出按钮
                        amplifyBtn=$('.amplifyBtn'),//放大按钮
                        rotationBtn=$('.rotationBtn'),//旋转按钮
                        shakeBtn=$('.shakeBtn'),//抖动按钮
                        span100000=ele.find('.left_t'),
                        span010000=ele.find('.center_t'),
                        span001000=ele.find('.right_t'),
                        span000100=ele.find('.left_b'),
                        span000010=ele.find('.center_b'),
                        span000001=ele.find('.right_b'),
                        pos={
                                start:{
                                        x:null,
                                        y:null
                                    },
                                move:{
                                        x:null,
                                        y:null
                                    },
                                end:{
                                        x:null,
                                        y:null
                                    },
                                now:{
                                    left:null,
                                    top:null
                                },
                                delta:{
                                    x:null,
                                    y:null
                                }
                            };
                    init();
                    function init(){
                        ele.on('touchstart',sometime);
                        if(!closeAnimation.data('only')){
                            closeAnimation.data('only', true);
                            closeAnimation.on('tap',closeAnimationLayer);
                            fadeInBtn.on('tap',addAnimation.bind(ele,'at-fadeIn'));
                            fadeOutBtn.on('tap',addAnimation.bind(ele,'at-fadeOut'));
                            amplifyBtn.on('tap',addAnimation.bind(ele,'at-amplify'));
                            rotationBtn.on('tap',addAnimation.bind(ele,'at-rotation'));
                            shakeBtn.on('tap',addAnimation.bind(ele,'at-shake'));
                            // $(document).on('contextmenu',controll);
                            $('.stage_bj').on('touchmove.scroll',controll);
                            $('.stage_bj').on('scroll.scroll',controll);
                        }
                        ele.on('longTap',showCropperLayer);
                        ele.find('.anim').on('tap',showAnimationLayer);
                        ele.find('.del').on('tap',delActive);
                        cropper100000();
                        cropper010000();
                        cropper001000();
                        cropper000100();
                        cropper000010();
                        cropper000001();
                    }
                    // function cancell(){
                    //     var imgs=ele.find('img');
                    //     imgs.on('touchstart',controll);
                    //     imgs.on('touchmove',controll);
                    //     imgs.on('touchend',controll);
                    //     imgs.on('contextmenu',controll);
                    // }
                    function controll(){
                        return false;
                    }
                    function sync(left,top,width,height){
                            scope.img.style.left=left+'px';
                            scope.img.style.top=top+'px';
                            scope.img.style.width=width+'px';
                            scope.img.style.height=height+'px';
                    }
                    function cropper100000(){
                        var flip=new Flip();
                        flip.init({
                                target:span100000[0],
                                start:start,
                                container:stage_bj,
                                move:move
                            });
                        var dim={
                            width:null,
                            height:null
                        };
                        var pos={
                            left:null,
                            top:null
                        };
                        function start(e){
                            dim.width=parseInt(ele.css('width'));
                            dim.height=parseInt(ele.css('height'));
                            pos.left=parseInt(ele.css('left'));
                            pos.top=parseInt(ele.css('top'));
                            prevent(e);
                            stop(e);
                        }
                        function move(e){
                            var width=dim.width-e._x,
                                height=dim.height-e._y;
                            var left=pos.left+e._x,
                                top=pos.top+e._y;
                            ele.css({
                                width: width+'px',
                                height: height+'px',
                                left:left+'px',
                                top:top+'px'
                            });
                            sync(left,top,width,height);
                            
                        }
                    }
                    function cropper010000(){
                        var flip=new Flip();
                        flip.init({
                                target:span010000[0],
                                start:start,
                                container:stage_bj,
                                move:move
                            });
                        var dim={
                            width:null,
                            height:null
                        };
                        var pos={
                            left:null,
                            top:null
                        };
                        function start(e){
                            dim.height=parseInt(ele.css('height'));
                            pos.top=parseInt(ele.css('top'));
                            prevent(e);
                            stop(e);
                        }
                        function move(e){
                            var height=dim.height-e._y;
                            var top=pos.top+e._y;
                            ele.css({
                                height: height+'px',
                                top:top+'px'
                            });
                            sync(left,top,width,height);
                        }
                    }
                    function cropper001000(){
                        var flip=new Flip();
                        flip.init({
                                target:span001000[0],
                                start:start,
                                container:stage_bj,
                                move:move
                            });
                        var dim={
                            width:null,
                            height:null
                        };
                        var pos={
                            left:null,
                            top:null
                        };
                        function start(e){
                            dim.width=parseInt(ele.css('width'));
                            dim.height=parseInt(ele.css('height'));
                            pos.left=parseInt(ele.css('left'));
                            pos.top=parseInt(ele.css('top'));
                            prevent(e);
                            stop(e);
                        }
                        function move(e){
                            var width=dim.width+e._x,
                                height=dim.height-e._y;
                            var top=pos.top+e._y;
                            ele.css({
                                width: width+'px',
                                height: height+'px',
                                top:top+'px'
                            });
                            sync(left,top,width,height);
                        }
                        
                    }
                    function cropper000100(){
                        var flip=new Flip();
                        flip.init({
                                target:span000100[0],
                                start:start,
                                container:stage_bj,
                                move:move
                            });
                        var dim={
                            width:null,
                            height:null
                        };
                        var pos={
                            left:null,
                            top:null
                        };
                        function start(e){
                            dim.width=parseInt(ele.css('width'));
                            dim.height=parseInt(ele.css('height'));
                            pos.left=parseInt(ele.css('left'));
                            pos.top=parseInt(ele.css('top'));
                            prevent(e);
                            stop(e);
                        }
                        function move(e){
                            var width=dim.width-e._x,
                                height=dim.height+e._y;
                            var left=pos.left+e._x;
                            ele.css({
                                width: width+'px',
                                height: height+'px',
                                left:left+'px'
                            });
                            sync(left,top,width,height);
                        }
                        
                    }
                    function cropper000010(){
                        var flip=new Flip();
                        flip.init({
                                target:span000010[0],
                                start:start,
                                container:stage_bj,
                                move:move
                            });
                        var dim={
                            width:null,
                            height:null
                        };
                        var pos={
                            left:null,
                            top:null
                        };
                        function start(e){
                            dim.width=parseInt(ele.css('width'));
                            dim.height=parseInt(ele.css('height'));
                            pos.left=parseInt(ele.css('left'));
                            pos.top=parseInt(ele.css('top'));
                            prevent(e);
                            stop(e);
                        }
                        function move(e){
                            var height=dim.height+e._y;
                            ele.css({
                                height:height+'px'
                            });
                            sync(left,top,width,height);
                        }
                        
                    }
                    function cropper000001(){
                        var flip=new Flip();
                        flip.init({
                                target:span000001[0],
                                start:start,
                                container:stage_bj,
                                move:move
                            });
                        var dim={
                            width:null,
                            height:null
                        };
                        var pos={
                            left:null,
                            top:null
                        };
                        function start(e){
                            dim.width=parseInt(ele.css('width'));
                            dim.height=parseInt(ele.css('height'));
                            pos.left=parseInt(ele.css('left'));
                            pos.top=parseInt(ele.css('top'));
                            prevent(e);
                            stop(e);
                        }
                        function move(e){
                            var width=dim.width+e._x,
                                height=dim.height+e._y;
                            ele.css({
                                width: width+'px',
                                height: height+'px'
                            });
                            sync(left,top,width,height);
                        }
                        
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

                        ele.find('img').off('contextmenu',controll);
                        ele.find('img').on('contextmenu',controll);

                    }
                    function closeAnimationLayer(){
                        animationOperate.addClass('hide');
                        stageNav.removeClass('hide');
                    }

                    function delActive(){
                        $('.active').remove();
                        closeAnimation.trigger('tap');
                    }

                    function sometime(e){
                        if(!this.classList.contains('active')){
                            return;
                        }
                        updateStartPos(e);
                        updateNowPos();
                        ele.on('touchmove',drag);
                        ele.on('touchend',drop);
                    }

                    function drag(e){
                        updateMovePos(e);
                        updateDelta();
                        setPos();
                    }
                    function drop(){
                        ele.off('touchmove',drag);
                        ele.off('touchend',drop);
                    }
                    function updateStartPos(e){
                        pos.start.x=e.touches[0].pageX;
                        pos.start.y=e.touches[0].pageY;
                    }
                    function updateMovePos(e){
                        pos.move.x=e.touches[0].pageX;
                        pos.move.y=e.touches[0].pageY;
                    }
                    function updateNowPos(){
                        pos.now.left=parseInt(ele.css('left'));
                        pos.now.top=parseInt(ele.css('top'));
                    }
                    function updateDelta(){
                        pos.delta.x=pos.move.x-pos.start.x;
                        pos.delta.y=pos.move.y-pos.start.y;
                    }
                    function setPos(){
                        var left=pos.now.left+pos.delta.x+'px';
                        var top=pos.now.top+pos.delta.y+'px';
                        ele.css({
                                'left':left,
                                'top':top,
                            });
                        scope.img.style.left=left;
                        scope.img.style.top=top;
                    }
                    function prevent(e){
                        e.preventDefault();
                    }
                    function stop(e){
                        e.stopPropagation();
                    }

                    function Flip(){
                        var step=20,
                        target=null,
                        touch={},
                        hasDefault,sensitivity,
                        supportTouch='ontouchstart' in window,
                        S=supportTouch?'touchstart':'mousedown',
                        M=supportTouch?'touchmove':'mousemove',
                        E=supportTouch?'touchend':'mouseup',
                        cb={
                          start:null,
                          move:null,
                          end:null,
                          left:null,
                          right:null,
                          up:null,
                          down:null
                        },
                        container=document,
                        _dir=[];
                        function swipeDirection(x1,x2,y1,y2,sensitivity) {
                            var _x=Math.abs(x1-x2),
                                _y=Math.abs(y1-y2),
                                dir=_x>=_y?(x1-x2>0?'left':'right'):(y1-y2>0?'up':'down');
                            if(sensitivity){
                                if(dir=='left'||dir=='right'){
                                    if((_y/_x)>sensitivity){dir='';}
                                }else if(dir=='up'||dir=='down'){
                                    if((_x/_y)>sensitivity){dir='';}
                                }
                            }

                            return dir;
                        }
                        function _start(e){
                            var pos=(e.touches&&e.touches[0])||e;
                            touch.x1=pos.pageX;
                            touch.y1=pos.pageY;
                            e.x=touch.x1;
                            e.y=touch.y1;
                            typeof cb.start==='function'&&cb.start(e);
                            container.addEventListener(M,_move,false);
                            container.addEventListener(E,_end,false);
                        }
                        function _move(e){
                            var pos=(e.touches&&e.touches[0])||e;
                            touch.x2=pos.pageX;
                            touch.y2 = pos.pageY;
                            e.x=touch.x2;
                            e.y=touch.y2;
                            e._x=e.x-touch.x1;
                            e._y=e.y-touch.y1;
                            if(!hasDefault){e.preventDefault();}
                            typeof cb.move==='function'&&cb.move(e);
                        }
                        function _end(e){
                            e.x=touch.x2;
                            e.y=touch.y2;
                            e._x=e.x-touch.x1;
                            e._y=e.y-touch.y1;
                            if((touch.x2&&Math.abs(touch.x1-touch.x2)>step)||(touch.y2&&Math.abs(touch.y1-touch.y2)>step)){
                                var dir_=swipeDirection(touch.x1,touch.x2,touch.y1,touch.y2,sensitivity);
                                typeof cb[dir_] === 'function'&&cb[dir_](e);
                            }
                            typeof cb.end==='function'&&cb.end(e);
                            container.removeEventListener(M,_move,false);
                            container.removeEventListener(E,_end,false);
                        }
                        function flip(el,hasDefault, sensitivity) {
                            if(!el)return;
                            el.addEventListener(S,_start,false);
                        }
                        function flipRevoke(el) {
                            if(!el){return;}
                            el.removeEventListener(S,_start,false);
                            el.removeEventListener(M,_move,false);
                            el.removeEventListener(E,_end,false);
                        }


                        function render(target,hasDefault,sensitivity){
                            flip(target,hasDefault,sensitivity);
                        }

                        return {
                          target:null,
                          conf:{},
                          init:function(opts){
                              container=opts.container||document;                       
                              this.target=target=opts.target;
                              step=opts.step||step;
                              sensitivity=opts.sensitivity||sensitivity;
                              var dir=['up','down','left','right','start','move','end'],l=dir.length;
                              while(l--){
                                if(opts[dir[l]]){
                                  cb[dir[l]]=opts[dir[l]];
                                  _dir.push(dir[l]);
                                }
                              }
                              render(target,opts.hasDefault,sensitivity);
                          },
                          cancel:function(){
                              flipRevoke(target);
                          }
                        }
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

    //超链接底部导航
    function btn(){
        return {
            scope:{},
            restrict:'A',
            link:function(scope,element,attrs){
                var obj = $(element[0]);
                var btn_list = obj.find(".edit_text_nav").find("div");
                var area = obj.find(".edit_box").find(".display_area");
                btn_list.each(function(i){
                    $(this).on("tap",function(){ 
                    $(this).addClass("act").siblings().removeClass("act");
                    area.eq(i).show().siblings().hide()
                  })
                })
            }   
        }
    }

    //拖拽设置
    function myScroll(){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                myId:"@",
                info:"=",
            },
            template: '<div id="{{myId}}"><div class="set-line"><div class="set-btn"></div></div><div class="values"></div></div>',
            link : function(scope,element,attr){
                var element=$(element[0]);
                var obj1 = element.find(".set-btn");
                var obj2 = element.find(".set-line");
                var obj3 = element.find(".values");
                obj1.on("touchstart",function(ev){
                    
                    var disX=ev.targetTouches[0].pageX - obj1.position().left;
                    var disY=ev.targetTouches[0].pageY - obj1.position().top;
    
                    $(document).on("touchmove",drag);
                    function drag(ev){    
                        var l=ev.targetTouches[0].pageX-disX;   
                        if(l<0)
                        {
                            l=0;
                        }else if(l > obj2.width() - obj1.width())
                        {
                            l = obj2.width() - obj1.width()
                        }
                        obj1.css("left",l);
                        
                        var sacle=l/(obj2.width() - obj1.width());
                        obj3.html(parseInt(sacle * scope.info));
                        }
                    $(document).on("touchend",drop);
                    function drop(){
                        $(document).off("touchmove",drag);
                        $(document).off("touchend",drop);
                        
                    }
                    ev.preventDefault();    
                    
                });  
            },
        }   
    }
}));
