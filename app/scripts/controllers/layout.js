'use strict';

/**
 * @ngdoc function
 * @name slgjApp.controller:BodyCtrl
 * @description
 * # BodyCtrl
 * Controller of the slgjApp
 */
angular.module('slgjApp').controller('LayoutCtrl', ['$scope','$rootScope','$translate',function ($scope,$rootScope,$translate) {

  // //切换
  $scope.onTabSwitched = function (tab) {
    // $scope.currentTab = tab;
    // $scope.sxTabsControl.currentTab = tab;
    // $scope.messages.push('Tab switched: ' + tab.id);
    // console.log("//TODO:show in nav");
  };


  $scope.tabs = [];
  $scope.sxTabsControl = {};
  $rootScope.addTabFn = function (tab){
    console.log(tab);
    if(tab.url && tab.url!=='#'){
      $scope.sxTabsControl.addTabItem(tab);
    }
  }

  $scope.tabList = function (data) {
    // data[0].url = 'views/voucher/out.html';
    //status
    $scope.addTabFn(data[0]);
  }



  //语言切换
  $scope.changeLang = function (key) {
    $translate.use(key).then(function (key) {
      console.log("Language "+ key ,' selected');
    },function (key) {
      console.log("Language "+ key ,' selected.......');
    })
  }




}]);
