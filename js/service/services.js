/* 
* @Author: wanghongxin
* @Date:   2015-05-05 17:56:42
* @Last Modified by:   wanghongxin
* @Last Modified time: 2015-05-07 13:59:56
*/

'use strict';
;(function(root,factory){
    factory.call(root,angular);
}(this,function(angular){
    var appServices=angular.module('appServices',[]);
    appServices.provider('phoneProvider',
            function(){
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
                    }
                }
            }
        );
    appServices.factory('phoneFactory',
            function(){
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
            }
        );
    appServices.service('phoneService',
            function(){
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
                }
                this.getArtist=_getArtist;
                this.setArtist=_setArtist;
                this.getLover=_getLover; 
                this.setLover=_setLover; 
            }
        );
}));


