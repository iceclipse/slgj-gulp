'use strict';
/**
 * @ngdoc directive
 * @name slgjApp.directive:print
 * @description
 * # print
 */
angular.module('slgjApp')
  .directive('printModal', ['$window', function ($window) {
    var opener = null, printObj = null;
    //1.get print template
    $window.getPrintSection = function () {
      var _html = $window.document.getElementById(printObj.sectionId) ? $window.document.getElementById(printObj.sectionId).innerHTML : "<h3 class='alert-error'>获取["+printObj.title+"]打印表单失败..</h3>";
      return {contents: _html, title: printObj.title};
    }
    //2.print complete
    $window.printEnd = function () {
      opener && opener.close();
    }

    return {
      restrict: "A",
      link: function (scope, el, attr) {

        el.on('click', function () {
          printObj = angular.fromJson(attr.printData);
          opener = window.open('../print.html', 'newwindow', 'height=900,width=800,left=100,top=50,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
        })
      }

    }
  }]);
