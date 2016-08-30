'use strict';

/**
 * @ngdoc function
 * @name slgjApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the slgjApp
 */

angular.module('slgjApp')
  .controller('AboutCtrl', ['$scope','$uibModal','UserTest',function ($scope,$uibModal,UserTest) {



    // console.log('AboutCtrl');


  UserTest.testApi({},{},function(data){
    // console.log(data);
  },function(data){
    // console.error(data);
  })



    $scope.searchType = 1;


    //1.分页
    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };
    $scope.pageChanged = function() {
      console.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 100;
    $scope.bigCurrentPage = 1;


    //2.弹框
    $scope.open = function () {
      $uibModal.open({
        animation: true,
        backdrop:'static',
        windowClass:'read-card-modal',
        templateUrl: 'views/modal/read-card.html',
        controller: function($scope,$uibModalInstance){
          $scope.ok = function () {
            $uibModalInstance.close();
          };

          //1.获取卡号信息
          //$timeout(function(){
          //  console.log('卡号:12131313');
          //  //2.根据卡号获取客户信息
          //  console.log('show  user info..');
          //  $uibModalInstance.close();
          //},2000);
        }
      }).result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };


  }]);


