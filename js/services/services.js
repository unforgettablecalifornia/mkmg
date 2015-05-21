'use strict';
;(function(root,factory){
    //显性的制定依赖
    var angular=window.angular;
    //运行工厂
    factory.call(root,angular);
}(this,function(angular){//工厂的定义
    //定义一个angular模块，专门存放本应用的服务
    angular.module('appServices',[]).
        provider('magaProvider',magaProvider).
        provider('magasProvider',magasProvider).
        factory('Flip',Flip);
    //当前要制作的杂志服务
    function magaProvider(){
        return {
            $get:function(){
                return {
                    swift:true,
                    texts:[]
                };
            }
        }
    }
    //本次应用周期内制作的杂志列表服务
    function magasProvider(){
        return {
            $get:function(){
                return {
                    swift:true,
                    magaList:[],
                    add:function(){
                        this.magaList.push({
                                id:_.uniqueId('maga_')
                            });
                    }
                };
            }
        }
    }
    //滑动服务
    function Flip(){
        return function(){
            var step=20,
            target=null,
            touch={},
            hasDefault,
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
                  sensitivity=opts.sensitivity;
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
}));


