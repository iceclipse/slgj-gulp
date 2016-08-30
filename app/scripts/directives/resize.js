'use strict';
/**
 * @ngdoc directive
 * @name slgjApp.directive:resize
 * @description
 * # resize
 */
angular.module('slgjApp')
  .directive('resize', ['$window',function ($window) {

    var e = window,a = 'inner';
    if (!('innerWidth' in window )){
      a = 'client';
      e = document.documentElement || document.body;
    }
    return function (scope, element) {
      var w = angular.element($window),_h=0;
      scope.getWindowDimensions = function () {
        _h=e[a+'Height'];
        //_w=e[a+'Width']
        _h = _h > 310 ? _h : 310;
        //console.log(_h)
        element.css({'height':_h-100+'px'});
      };

      scope.getWindowDimensions();
      w.bind('resize', function () {
        scope.getWindowDimensions();
      });
    };
  }]);
