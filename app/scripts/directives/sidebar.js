'use strict';
//Sidebar Menu Handle
angular.module('slgjApp')
  .directive('sidebarMenu', function () {
    return {
      restrict: 'A',
      scope: {
        onMenuClick: '&addTabFn',
        MenuListFn: '&tabList'
      },
      link: function (scope, el) {
        el.find('li.active').parents('li').addClass('active open');
        el.on('click', 'a', function (e) {
          e.preventDefault();
          e.stopPropagation();
          // console.log(scope.currentTab.name);
          var isCompact = $("#sidebar").hasClass("menu-compact");
          var menuLink = $(e.target);
          if ($(e.target).is('span')){
            menuLink = $(e.target).closest('a');
          }
          if (!menuLink || menuLink.length === 0) {
            return;
          }
          menuLink.parent().siblings('.open').removeClass('open');
          if (!menuLink.hasClass("menu-dropdown")) {
            if (isCompact && menuLink.get(0).parentNode.parentNode === this) {
              var menuText = menuLink.find(".menu-text").get(0);
              if (e.target !== menuText && !$.contains(menuText, e.target)) {
                return false;
              }
            }
            return;
          }
          var submenu = menuLink.next().get(0);
          if (submenu && !$(submenu).is(":visible")) {
            var c = $(submenu.parentNode).closest("ul");
            if (isCompact && c.hasClass("sidebar-menu")){
              return;
            }
            c.find("* > .open > .submenu")
              .each(function () {
                if (this !== submenu && !$(this.parentNode).hasClass("active")){
                  $(this).parent().removeClass("open");
                }
              });
          }
          if (isCompact && $(submenu.parentNode.parentNode).hasClass("sidebar-menu")){
            return false;
          }

          $(submenu).parent().toggleClass("open");
          return false;
        });
      },
      templateUrl: 'views/component/sidebar.html',
      controller: ['$scope', 'UserTest', function ($scope, UserTest) {
        //1.获取菜单列表
        // console.log('hi this is side bar directive controller');
        UserTest.getMenus({}, {}, function (data) {
          $scope.menuList = data;
          $scope.MenuListFn({list: data});
        }, function (data) {
          console.error(data);
        });
        $scope.menuClick = function (tab) {
          $scope.currentTab = tab;
          $scope.onMenuClick({tab: tab});
        };

      }]
    };
  });

