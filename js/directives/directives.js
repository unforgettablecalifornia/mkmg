'use strict';
;(function(root,factory){
    var angular=window.angular;
    var $=window.$;
    var _=window._;
    var Math=window.Math;
    factory.call(root,angular,Math,$,_);
}(this,function(angular,Math,$,_){
    angular.module('appDirectives',[]).
        directive('dragXDirective',dragXDirective).
        directive('cropperDirective',cropperDirective).
        directive('dragSetDirective',dragSetDirective).
        directive('commonDirective',commonDirective).
        directive('lotteryDirective',lotteryDirective).
        directive('cutDirective',cutDirective).
		directive('btn',btn).
        directive('myScroll',myScroll);
    //公用指令
    function commonDirective(){
        return {
            restrict:'A',
            controller:function($scope,$element,$transclude,lotteryProvider,flipProvider,magasProvider){
                $scope.Lottery=lotteryProvider;
                $scope.Flip=flipProvider;
                $scope.magasProvider=magasProvider;
            }   
        }
    }
    //转场指令
    function cutDirective(){
        return {
            require:'^commonDirective',
            restrict:'A',
            link:function(scope,ele,attrs){
                ele=$(ele[0]);
                var Flip=scope.Flip,
                    newMaga=scope.magasProvider.getNewMaga(),
                    pages=ele.find('.page'),
                    cut={
                        current:0,
                        height:0
                    },
                    poly={
                        style:document.createElement('div').style,
                        vendor:function() {
                                    var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
                                        transform,
                                        i = 0,
                                        l = vendors.length;
                            
                                    for ( ; i < l; i++ ) {
                                        transform = vendors[i] + 'ransform';
                                        if ( transform in this.style ) return vendors[i].substr(0, vendors[i].length-1);
                                    }
                                    return false;
                                },
                        prefix:function (style) {
                                    if ( this.vendor() === false ) return false;
                                    if ( this.vendor() === '' ) return style;
                                    return this.vendor() + style.charAt(0).toUpperCase() + style.substr(1);
                                }
                    },
                    logic={
                        next:0,
                        now:0,
                        up:function(){
                            var now=cut.current-1;
                            if(now<0)now=0;
                            this.next=now;
                            return pages.eq(now);
                        },
                        down:function(){
                            var now=cut.current+1;
                            if(now>(pages.length-1))now=pages.length-1;
                            this.next=now;
                            return pages.eq(now)
                        },
                        where:function(){
                            var next=this.next;
                            if(next==cut.current){
                                
                            }else if(next<cut.current){

                                this.appear(pages.eq(next));
                                this.transform(next);
                                this.effect(next);

                            }else if(next>cut.current){

                                this.appear(pages.eq(next));
                                this.transform(next);
                                this.effect(next);

                            }
                        },
                        current:function(){
                            pages=ele.find('.page');
                            pages.each(function(index,value){
                                if(value.classList.contains('current')){
                                    cut.current=index;
                                }
                            });
                            pages.removeClass('cut');
                            cut.height=ele.height();
                            console.log(scope)
                            
                        },
                        appear:function(who){
                            who.addClass('appear');
                        },
                        transform:function(next){
                            if(next<cut.current){
                                var transform=poly.prefix('transform');
                                pages.get(next).style[transform]='translate3d(0,-'+cut.height+'px,0)';
                                pages.eq(next).addClass('st');
                                logic.now=cut.current;
                            }else if(next>cut.current){
                                var transform=poly.prefix('transform');
                                pages.get(next).style[transform]='translate3d(0,'+cut.height+'px,0)';
                                pages.eq(next).addClass('st');
                                logic.now=cut.current;
                            }
                        },
                        effect:function(next){
                            var _this=this;
                            _.delay(function(){
                                    pages.get(next).style[poly.prefix('transform')]='translate3d(0,0,0)';
                                    _.delay(function(){
                                        _this.build();
                                    }, 300);
                                },100);
                        },
                        build:function(){
                            scope.state.active=logic.next;
                            newMaga.active=logic.next;
                            pages.eq(logic.now).removeClass('current');
                            pages.eq(logic.next).addClass('current');
                            pages.eq(logic.next).removeClass('appear');
                            pages.eq(logic.next).removeClass('st');

                        }
                    },
                    handler={
                        start:function(){
                            logic.current();
                        },
                        up:function(){
                            logic.down();
                            logic.where();
                        },
                        down:function(){
                            logic.up();
                            logic.where();
                        }
                    };
                var flip=new Flip;
                flip.init({
                    target:ele[0],
                    container:ele[0],
                    start:handler.start,
                    up:handler.up,
                    down:handler.down
                });
            }
        }
    }
    //涂抹效果
    function lotteryDirective(){
        return {
            require:'^commonDirective',
            restrict:'A',
            link:function(scope,element,attrs){
                return;
                _.delay(function(){
                    var target=element[0],
                        dim=getComputedStyle(target,false),
                        width=parseInt(dim.width),
                        height=parseInt(dim.height),
                        Lottery=scope.Lottery,
                        lottery=new Lottery(target,'img/img05.jpg','image',width,height,cb,60);
                    lottery.init();
                    
                    function cb(wrapper,move,end){
                        wrapper.removeChild(wrapper.querySelector('.lottery'));
                        lottery=null;
                        wrapper.removeEventListener('touchmove',move);
                        wrapper.removeEventListener('touchend',end);
                    }
                },100);
            }   
        }
    }
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
                        Flip=scope.Flip,
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
                            fadeInBtn.on('tap',addAnimation.bind(ele,'fadeIn'));
                            fadeOutBtn.on('tap',addAnimation.bind(ele,'fadeOut'));
                            amplifyBtn.on('tap',addAnimation.bind(ele,'zoomIn'));
                            rotationBtn.on('tap',addAnimation.bind(ele,'rotateIn'));
                            shakeBtn.on('tap',addAnimation.bind(ele,'ring'));
                            // $(document).on('contextmenu',controll);
                            $('.stage_bj').on('touchmove.scroll',controll);
                            $('.stage_bj').on('scroll.scroll',controll);
                        }
                        ele.on('longTap',showCropperLayer);
                        ele.find('.anim').on('tap',showAnimationLayer);
                        ele.find('.del').on('tap',delActive);
                        ele.find('img').on('touchend',defaultAndPropagation);
                        cropper100000();
                        cropper010000();
                        cropper001000();
                        cropper000100();
                        cropper000010();
                        cropper000001();
                    }
                    function controll(){
                        return false;
                    }
                    function defaultAndPropagation(e){
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    function sync(left,top,width,height){
                            if(left!==undefined)scope.img.style.left=left+'px';
                            if(top!==undefined)scope.img.style.top=top+'px';
                            if(width!==undefined)scope.img.style.width=width+'px';
                            if(height!==undefined)scope.img.style.height=height+'px';
                    }
                    function cropper100000(){
                        var flip=new Flip();
                        flip.init({
                                target:span100000[0],
                                start:start,
                                container:ele[0],
                                move:move,
                                end:end
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

                            prevent(e);
                            stop(e);
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
                        function end(e){
                            
                            prevent(e);
                            stop(e);
                        }
                    }
                    function cropper010000(){
                        var flip=new Flip();
                        flip.init({
                                target:span010000[0],
                                start:start,
                                container:ele[0],
                                move:move,
                                end:end
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

                            prevent(e);
                            stop(e);
                            var height=dim.height-e._y;
                            var top=pos.top+e._y;
                            var left;
                            var width;
                            ele.css({
                                height: height+'px',
                                top:top+'px'
                            });
                            sync(left,top,width,height);
                        }
                        function end(e){
                            
                            prevent(e);
                            stop(e);
                        }
                    }
                    function cropper001000(){
                        var flip=new Flip();
                        flip.init({
                                target:span001000[0],
                                start:start,
                                container:ele[0],
                                move:move,
                                end:end
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

                            prevent(e);
                            stop(e);
                            var width=dim.width+e._x,
                                height=dim.height-e._y;
                            var top=pos.top+e._y;
                            var left;
                            ele.css({
                                width: width+'px',
                                height: height+'px',
                                top:top+'px'
                            });
                            sync(left,top,width,height);
                        }
                        function end(e){
                            
                            prevent(e);
                            stop(e);
                        }
                        
                    }
                    function cropper000100(){
                        var flip=new Flip();
                        flip.init({
                                target:span000100[0],
                                start:start,
                                container:ele[0],
                                move:move,
                                end:end
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

                            prevent(e);
                            stop(e);
                            var width=dim.width-e._x,
                                height=dim.height+e._y;
                            var left=pos.left+e._x;
                            var top;
                            ele.css({
                                width: width+'px',
                                height: height+'px',
                                left:left+'px'
                            });
                            sync(left,top,width,height);
                        }
                        function end(e){
                            
                            prevent(e);
                            stop(e);
                        }
                        
                    }
                    function cropper000010(){
                        var flip=new Flip();
                        flip.init({
                                target:span000010[0],
                                start:start,
                                container:ele[0],
                                move:move,
                                end:end
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

                            prevent(e);
                            stop(e);
                            var height=dim.height+e._y;
                            ele.css({
                                height:height+'px'
                            });
                            sync(left,top,width,height);
                        }
                        function end(e){
                            
                            prevent(e);
                            stop(e);
                        }
                        
                    }
                    function cropper000001(){
                        var flip=new Flip();
                        flip.init({
                                target:span000001[0],
                                start:start,
                                container:ele[0],
                                move:move,
                                end:end
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

                            prevent(e);
                            stop(e);
                            var width=dim.width+e._x,
                                height=dim.height+e._y;
                            var left;
                            var top;
                            ele.css({
                                width: width+'px',
                                height: height+'px'
                            });
                            sync(left,top,width,height);
                        }
                        function end(e){
                            
                            prevent(e);
                            stop(e);
                        }
                        
                    }
                    function addAnimation(effectName){
                        var active=$('.current .active');
                        var classList=['fadeIn','fadeOut','zoomIn','rotateIn','ring'];
                        classList.forEach(function(item,index,classList){
                                active.removeClass(item);
                            });
                        active.addClass(effectName);
                    }
                    function showCropperLayer(){
                        var parent=ele.parent();
                        var siblings=parent.find('.active');
                        siblings.removeClass('active');
                        ele.addClass('active');
                        scope.$apply(function(){
                            
                        });
                        return false;
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
                }
        }
    }
    // 拖拽设置值指令
    function dragSetDirective(){
        return {
            scope:{
                'defaultx':'=',
                'big':'=',
                'unit':'@'
            },
            templateUrl:'partials/dragSet.html',
            link:function(scope,ele,attrs){
                var ele=$(ele[0]),
                    setLine=ele.find('.set-line'),
                    setBtn=ele.find('.set-btn'),
                    setLineWidth=setLine.width(),
                    eleWidth=ele.width(),
                    values=ele.find('.values span'),
                    big=scope.big,
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
                    setLineWidth=setLine.width()
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
                    scope.$apply(function(){
                            scope.defaultx=value;
                        });
                    values.html(parseFloat(value/setLineWidth*big).toFixed(1));
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
						if(i==4)
						{
							area.hide();
							$(".add_btn_link").show();
						}else
						{
							area.eq(i).show().siblings().hide()
							$(".add_btn_link").hide();
						}
                    
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
            template: ' <div>'+
							'<div class="set-l">小</div>'+
							'<div class="set-line">'+
								'<div class="set-btn">'+
									'<div class="values_box">'+
										'<span class="values"></span>'+
										'<span class="units"></span>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<div class="set-r">大</div>'+
						'</div>',
		
            link : function(scope,element,attr){
 
                var element=$(element[0]);
                var obj1 = element.find(".set-btn");
                var obj2 = element.find(".set-line");
                var obj3 = element.find(".values");
				var obj4 = element.find(".units");
				
                obj1.on("touchstart",function(ev){
                    
                    var disX=ev.targetTouches[0].pageX - obj1.position().left;
                    var disY=ev.targetTouches[0].pageY - obj1.position().top;  
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
						scope.sacle=l/(obj2.width() - obj1.width());
						scope.$apply(attr.loaddatafn); 
					 	scope.$apply(attr.fw); 
						obj3.html(attr.fw);
					
						obj4.show();
						 
                    }
                    
                    function drop(){
                        $(document).off("touchmove",drag);
                        $(document).off("touchend",drop);
                        
                    }
					
					$(document).on("touchmove",drag);
					$(document).on("touchend",drop);
                    ev.preventDefault();    
                    
                });  
            },
        }   
    }
}));