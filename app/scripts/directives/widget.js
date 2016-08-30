'use strict';
/**
 * @ngdoc directive
 * @name slgjApp.directive:resize
 * @description
 *
 */
//Resize  Widget
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
        _h = _h > 310 ? _h : 310;
        element.css({'height':_h-100+'px'});
        document.getElementById('sidebar').style.height = _h-86+'px';

      };
      scope.getWindowDimensions();
      w.bind('resize', function () {
        scope.getWindowDimensions();
      });
    };
  }]);




//Maximize Widget
angular.module('slgjApp')
    .directive('widgetMaximize', function () {
        return {
            restrict: 'A',
            template: '<i class="fa fa-expand"></i>',
            link: function (scope, el, attr) {
                el.on('click', function () {
                    var widget = el.parents(".widget").eq(0);
                    var button = el.find("i").eq(0);
                    var compress = "fa-compress";
                    var expand = "fa-expand";
                    if (widget.hasClass("maximized")) {
                        if (button) {
                            button.addClass(expand).removeClass(compress);
                        }
                        widget.removeClass("maximized");
                        widget.find(".widget-body").css("height", "auto");
                    } else {
                        if (button) {
                            button.addClass(compress).removeClass(expand);
                        }
                        widget.addClass("maximized");
                        if (widget) {
                            var windowHeight = $(window).height();
                            var headerHeight = widget.find(".widget-header").height();
                            widget.find(".widget-body").height(windowHeight - headerHeight);
                        }
                    }
                });
            }
        };
    });

//Collapse Widget
angular.module('slgjApp')
    .directive('widgetCollapse', function () {
        return {
            restrict: 'A',
            template: '<i class="fa fa-minus"></i>',
            link: function (scope, el, attr) {
                el.on('click', function () {
                    var widget = el.parents(".widget").eq(0);
                    var body = widget.find(".widget-body");
                    var button = el.find("i");
                    var down = "fa-plus";
                    var up = "fa-minus";
                    var slidedowninterval = 300;
                    var slideupinterval = 200;
                    if (widget.hasClass("collapsed")) {
                        if (button) {
                            button.addClass(up).removeClass(down);
                        }
                        widget.removeClass("collapsed");
                        body.slideUp(0, function () {
                            body.slideDown(slidedowninterval);
                        });
                    } else {
                        if (button) {
                            button.addClass(down)
                                .removeClass(up);
                        }
                        body.slideUp(slideupinterval, function () {
                            widget.addClass("collapsed");
                        });
                    }
                });
            }
        };
    });

//Expand Widget
angular.module('slgjApp')
    .directive('widgetExpand', function () {
        return {
            restrict: 'A',
            template: '<i class="fa fa-plus"></i>',
            link: function (scope, el, attr) {
                el.on('click', function () {
                    var widget = el.parents(".widget").eq(0);
                    var body = widget.find(".widget-body");
                    var button = el.find("i");
                    var down = "fa-plus";
                    var up = "fa-minus";
                    var slidedowninterval = 300;
                    var slideupinterval = 200;
                    if (widget.hasClass("collapsed")) {
                        if (button) {
                            button.addClass(up).removeClass(down);
                        }
                        widget.removeClass("collapsed");
                        body.slideUp(0, function () {
                            body.slideDown(slidedowninterval);
                        });
                    } else {
                        if (button) {
                            button.addClass(down)
                                .removeClass(up);
                        }
                        body.slideUp(slideupinterval, function () {
                            widget.addClass("collapsed");
                        });
                    }
                });
            }
        };
    });

//Dispose Widget
angular.module('slgjApp')
    .directive('widgetDispose', function () {
        return {
            restrict: 'A',
            template: '<i class="fa fa-times"></i>',
            link: function (scope, el, attr) {
                el.on('click', function () {
                    var widget = el.parents(".widget").eq(0);
                    var disposeinterval = 300;
                    widget.hide(disposeinterval, function () {
                        widget.remove();
                    });
                });
            }
        };
    });

//Config Widget
angular.module('slgjApp')
    .directive('widgetConfig', function () {
        return {
            restrict: 'A',
            template: '<i class="fa fa-cog"></i>',
            link: function (scope, el, attr) {
                el.on('click', function () {
                   //Do what you intend for configing widgets
                });
            }
        };
    });

//Config Widget
angular.module('slgjApp')
    .directive('widgetRefresh', function () {
        return {
            restrict: 'A',
            template: '<i class="fa fa-undo"></i>',
            link: function (scope, el, attr) {
                el.on('click', function () {
                    //Refresh widget content
                });
            }
        };
    });
//
// angular.module('slgjApp')
//   .directive('sidebarToggler', function() {
//       return {
//         restrict: 'AC',
//         template: '<i class="fa fa-arrows-h"></i>',
//         link: function(scope, el, attr) {
//           el.on('click', function() {
//             $("#sidebar").toggleClass("hide");
//             el.toggleClass("active");
//             return false;
//           });
//         }
//       };
//   });

//Sidebar Collapse
angular.module('slgjApp')
  .directive('sidebarCollapse', function () {
    return {
      restrict: 'A',
      link: function (scope, el, attr) {



        //el.find('li.active').parents('li').addClass('active open');
        el.click(function (e) {
          e.preventDefault();
          var isCompact = $("#sidebar");
          var min = $("#logo-compact");
          // el.toggleClass('active');
          if(el.hasClass('active')){
            el.removeClass('active')
            isCompact.removeClass('menu-compact');
            min.removeClass("logo-compact");
          }else{
            el.addClass('active')
            isCompact.addClass('menu-compact');
            min.addClass("logo-compact");
          }
          return false;
        });
      }
    };
  });
