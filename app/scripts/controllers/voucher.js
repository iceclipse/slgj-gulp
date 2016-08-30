'use strict';

/**
 * @ngdoc function
 * @name slgjApp.controller:VoucherCtrl
 * @description
 * # VoucherCtrl
 * Controller of the slgjApp
 */
angular.module('slgjApp')
  .controller('VoucherCtrl', ['$scope',function ($scope) {

    $scope.batchs = [{start:'',end:''}];
    $scope.addBatch = function(){
      $scope.batchs.push({start:'',end:''});
    };

    $scope.delBatch = function(_index){
      $scope.batchs = $scope.batchs.slice(_index,1);
    };

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


  }]);
