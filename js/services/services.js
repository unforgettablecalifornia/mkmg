'use strict';
;(function(root,factory){
    factory.call(root,angular);
}(this,function(angular){
    angular.module('appServices',[]).
        provider('magaProvider',magaProvider).
        provider('magasProvider',magasProvider);

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
}));


