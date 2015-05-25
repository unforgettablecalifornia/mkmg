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
        provider('magasProvider',magasProvider);
    //当前要制作的杂志服务
    function magaProvider(){
        return {
            $get:function(){
                return function(){
                    return {
                        pages:[],
                        addPage:function(){
                            console.log(this)
                            this.pages.splice(this.active+1,0,{
                                    'imgs':[]
                                })
                            this.active++;
                        }
                    }
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
                    addMaga:function(newMaga){
                        newMaga.id=_.uniqueId('maga_');
                        this.magaList.push(newMaga);
                    },
                    getNewMaga:function(){
                        return this.magaList[this.magaList.length-1];
                    },
                    listen:function($scope){
                        window.aaa=$scope;
                    }
                };
            }
        }
    }
}));


