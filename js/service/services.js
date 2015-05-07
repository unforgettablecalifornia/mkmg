/* 
* @Author: wanghongxin
* @Date:   2015-05-05 17:56:42
* @Last Modified by:   wanghongxin
* @Last Modified time: 2015-05-07 15:36:39
*/

'use strict';
//隔离区
;(function(root,factory){
    //运行
    factory.call(root,angular);//保持上下文为根对象
}(this,function(angular){
    //配置
    var keyValue={
            name:'whx'
        },
        keyConstant='123456789';
    //注册服务
    angular.module('appServices',[]).
        provider('phoneProvider',phoneProvider).
        factory('phoneFactory',phoneFactory).
        service('phoneService',phoneService).
        constant('keyConstant',keyConstant).
        value('keyValue',keyValue);

    //服务工厂
    function phoneProvider(){
        var _artist='wanghongxin';
        var _getArtist=function(){
            return _artist;
        };
        var _setArtist=function(artist){
            _artist=artist;
        };
        var _getLover=function(){
            return _lover;
        };
        var _lover='';
        return {
            $get:function(){
                return {
                    getArtist:_getArtist,
                    setArtist:_setArtist,
                    getLover:_getLover
                };
            },
            setLover:function(lover){
                _lover=lover;
            }
        }
    };
    function phoneFactory(){
        var _artist='wanghongxin';
        var _getArtist=function(){
            return _artist;
        };
        var _setArtist=function(artist){
            _artist=artist;
        };
        var _lover='';
        var _getLover=function(){
            return _lover;
        };
        return {
            getArtist:_getArtist,
            setArtist:_setArtist,
            getLover:_getLover
        };
    };
    function phoneService(){
        var _artist='wanghongxin';
        var _getArtist=function(){
            return _artist;
        };
        var _setArtist=function(artist){
            _artist=artist;
        };
        var _lover='ztt';
        var _getLover=function(){
            return _lover;
        };
        var _setLover=function(lover){
            _lover=_lover;
        };
        this.getArtist=_getArtist;
        this.setArtist=_setArtist;
        this.getLover=_getLover; 
        this.setLover=_setLover; 
    };
}));
//service和factory都是服务工厂，负责提供服务；
//provider是一个提供者，$get负责提供服务工厂；


