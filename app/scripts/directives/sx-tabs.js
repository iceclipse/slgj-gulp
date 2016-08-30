(function () {
  'use strict';

  var module = window.angular.module('sx.tabs', ['sx.tabs.tpls']);

  module.directive('sxTabs', ['$q', '$http', '$controller', '$compile', '$templateCache', '$timeout', '$tabsConsts',
    function ($q, $http, $controller, $compile, $templateCache, $timeout, $tabsConsts) {
      return {
        scope: {
          $options: '@sxTabsOptions',
          $tabs: '=sxTabs',
          $context: '=sxTabsContext',
          $onTabSwitched: '&sxTabSwitched',
          control:'='
        },
        templateUrl: $tabsConsts.template,
        link: function (scope, element) {
          scope.activeTab = {};
          scope.entering = false;
          scope.leaving = false;

          scope.$options = window.angular.extend({}, {
            cover: {
              autoAdjustHeight: false,
              hints: {
                entering: 'Loading...',
                leaving: 'leaving...'
              }
            }
          }, scope.$options);

          scope.$context = scope.$context || {};

          var _toggleCover = function (showCover, callback) {
            var containerElement = element.find('.sx-tabs-container');
            var coverElement = containerElement.find('div.outer');
            if (scope.$options && scope.$options.cover && scope.$options.cover.enabled) {
              if (showCover) {
                if (scope.$options.cover.autoAdjustHeight) {
                  $timeout(function () {
                    coverElement.height(containerElement.height());
                    coverElement.show();
                    return callback();
                  });
                }
                else {
                  coverElement.show();
                  return callback();
                }
              }
              else {
                coverElement.hide();
                return callback();
              }
            }
            else {
              coverElement.hide();
              return callback();
            }
          };

          var _setTemplatePromise = function (tab) {

            if (tab.template) {
              tab.$templatePromise = $q.when(tab);
            } else {
              tab.$templatePromise = $http.get(tab.url, {cache: $templateCache}).then(function (response) {
                tab.template = response.data;
                return tab;
              });
            }
          };

          var _isTabExist = function (id){
            for(var i=0;i<scope.$tabs.length;i++){
              if(scope.$tabs[i].id==id){
                return true;
              }
            }
            return false;
          }

          var _performLeaving = function (fromTab, toTab, byTabDisable, callback) {
            scope.leaving = true;
            if (fromTab && fromTab.$scope) {
              var options = {
                toTabId: toTab.id,
                byTabDisable: byTabDisable
              };
              fromTab.$scope.$context.behavior.leaving(options, function (valid) {
                scope.leaving = false;
                return callback(valid);
              });
            }
            else {
              scope.leaving = false;
              return callback(true);
            }
          };

          var _performEntering = function (fromTabId, toTab, callback) {
            scope.entering = true;
            toTab.$scope.$context.behavior.entering({
              fromTabId: fromTabId,
              entered: toTab.entered
            }, function () {
              toTab.entered = true;
              scope.entering = false;
              return callback();
            });
          };

          var _compileTabContent = function (tab, callback) {
            if (!tab.$scope || !tab.$controller) {
              tab.$scope = scope.$new();
              tab.$scope.$context = {
                data: scope.$context,
                behavior: {
                  entering: function (options, callback) {
                    return callback();
                  },
                  leaving: function (options, callback) {
                    return callback(true);
                  }
                }
              };
              tab.controller = tab.controller || window.angular.noop;
              tab.$controller = $controller(tab.controller, {$scope: tab.$scope});
              // use $timeout to allow browser to have a chance to render the element we've just created
              // http://stackoverflow.com/q/15660940
              $timeout(function () {
                var tabWrapper = element.find('div.tab-wrapper[sx-tab-id="' + tab.id + '"]');
                tabWrapper.append(tab.template);
                $compile(tabWrapper.contents())(tab.$scope);
                return callback();
              });
            }
            else {
              return callback();
            }
          };

          scope.switchTab = function (options, callback) {
            callback = callback || window.angular.noop;
            var e = options.e;
            var id = options.id;
            var byTabDisabled = options.byTabDisabled;

            // skip the default behavior  prevent them navigate to the other place
            if (e) {
              e.preventDefault();
              e.stopPropagation();
            }

            if (id && (
              !scope.activeTab ||
              !scope.activeTab.id ||
              scope.activeTab.id !== id)) {
              var tabs = scope.$tabs,
                tab = null;
              window.angular.forEach(tabs,function (t){
                if(t.id == id) {
                  tab = t;
                }
              })

              console.info(tab.name,tab.url);

              if (tab) {
                $q.when(tab.$templatePromise).then(function () {
                  _toggleCover(true, function () {
                    // perform tab's leaving logic
                    _performLeaving(scope.activeTab, tab, byTabDisabled, function (valid) {
                      if (valid) {
                        // invoke tab's controller for the first time
                        _compileTabContent(tab, function () {
                          var fromTabId = scope.activeTab.id;
                          scope.activeTab = tab;
                          _toggleCover(true, function () {
                            // perform tab's entering logic
                            _performEntering(fromTabId, tab, function () {
                              _toggleCover(false, function () {
                                // set this tab as active
                                window.angular.forEach(scope.$tabs, function (t) {
                                   t.isActive = (t.id === tab.id);
                                });
                                // call parent scope tab was switched
                                scope.$onTabSwitched({tab: tab});
                                return callback(true);
                              });
                            });
                          });
                        });
                      }
                      else {
                        return callback(false);
                      }
                    });
                  });
                });
              }
              else {
                return callback(false);
              }
            }
            else {
              return callback(false);
            }
          };


          var _getTabIds = function (currentId) {
            var tabIds = [];
            window.angular.forEach(scope.$tabs, function (tab) {
              tabIds.push(tab.id);
            });
            return tabIds;
          };

          var _getNextTabId = function (currentId) {
            var tabIds = _getTabIds(currentId);
            var currentIndex = tabIds.indexOf(currentId);
            var targetIndex = null;
            if (currentIndex > 0) {
              // current tab is not the first one, move to previous tab
              targetIndex = currentIndex - 1;
            }
            else {
              // current tab is the first one, move to the next tab
              targetIndex = currentIndex + 1;
            }
            return tabIds[targetIndex];
          };



          scope.removeTab = function (e, id) {
            // do not navigate tab since we need remove this tab
            if (e) {
              e.preventDefault();
              e.stopPropagation();
            }
            if (scope.activeTab && scope.activeTab.id === id) {
              var targetTabId = _getNextTabId(id);
              // trigger switch
              scope.switchTab({
                e: null,
                id: targetTabId,
                byTabDisabled: true
              });
            }
            //remove tab  from list
            window.angular.forEach(scope.$tabs,function (t,i) {
              if(t.id==id){
                scope.$tabs[i].template = null;
                scope.$tabs[i].$scope = null;
                scope.$tabs[i].$controller = null;
                scope.$tabs.splice(i,1);
              }
            })

          };

          var _findLandingTab = function () {
            if(!scope.$tabs){return;}
            if(scope.$tabs.length<1){return;}
            var firstTabId = scope.$tabs[0].id;
            var firstActiveTabId = null;
            var i = 0;
            while (i <= scope.$tabs.length - 1) {
              if (scope.$tabs[i].isActive &&
                !firstActiveTabId) {
                firstActiveTabId = scope.$tabs[i].id;
              }
              i++;
            }
            return firstActiveTabId || firstTabId;
          };
          $q.when(scope.$tabs).then(function (context) {
            scope.$context = context || {};
            // load template for tabs
            window.angular.forEach(scope.$tabs, function (tab) {
              tab.entered = false;
              delete tab.$scope;
              delete tab.$controller;
              _setTemplatePromise(tab);
            });

            // switch to the active tab, if no active tab set the first tab

            scope.switchTab({
              e: null,
              id: _findLandingTab(),
              byTabDisabled: true
            }, window.angular.noop);
          });

          scope.internalControl = scope.control || {};
          scope.internalControl.addTabItem = function (tab) {
            if(!_isTabExist(tab.id)){
              if(scope.$tabs.length>9){
                alert('最多同时打开10个页签，请关闭无关页签后继续操作');
                return;
              }
              scope.$tabs.push(tab);
              _setTemplatePromise(tab);
              scope.switchTab({
                e: null,
                id: tab.id,
                byTabDisabled: true
              });
            }else{
              // console.log('Exist......',tab.template);
              scope.switchTab({
                e: null,
                id: tab.id,
                byTabDisabled: true
              });
            }
          }
        }
      };
    }
  ]);
}());
