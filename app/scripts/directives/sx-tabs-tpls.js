(function() {
  'use strict';

  var module = window.angular.module('sx.tabs.tpls', []);

  module.value('$tabsConsts', {
    template: '$sx-ngtk/tabs/tabs.html'
  });

  module.run(['$templateCache', '$tabsConsts',
    function($templateCache, $tabsConsts) {
      $templateCache.put($tabsConsts.template,
        '<div role="tabpanel" class="sx-tabs">' +
        '    <ul class="nav nav-tabs sx-tabs-navigation">' +
        '        <li ' +
        '            ng-repeat="tab in $tabs track by $index"' +
        '            ng-class="tab.id === activeTab.id ? \'active\' : \'\'"' +
        '            sx-tab-nav-id="{{tab.id}}">' +
        '            <a href ng-click="switchTab({e: $event, id: tab.id, byTabDisabled: false}, window.angular.noop)">' +
        '               <button ng-show="$index > 0" class="close fa fa-close" type="button" ng-click="removeTab($event, tab.id)"></button>' +
        '               {{tab.name}}' +
        '            </a> ' +
        '        </li>' +
        '    </ul> ' +
        '    <div class="tab-content sx-tabs-container">' +
        '        <div ng-repeat="tab in $tabs track by $index"' +
        '             sx-tab-id="{{tab.id}}"' +
        '             class="tab-wrapper"' +
        '             ng-show="tab.id === activeTab.id">' +
        '        </div>' +
        '    </div>' +
        '</div>'
      );
    }
  ]);
}());
