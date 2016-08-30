'use strict';

/**
 * @ngdoc function
 * @name slgjApp.controller:OrganizeCtrl
 * @description
 * # OrganizeCtrl
 * Controller of the slgjApp
 */
angular.module('slgjApp')
  .controller('OrganizeCtrl', ['$scope','$stateParams','UserTest',function ($scope,$stateParams,UserTest) {


    //1.局部变量
    $scope.organizeId = $stateParams.id;
    $scope.organizeVId = $stateParams.vid||false;





    function getOrgById(){
      UserTest.getOrgById({id:$scope.organizeId},{},function(data){
        //console.log(data);
        $scope.organize = data;
      },function(data){

      });
    }



    if($scope.organizeId || $scope.organizeVId){
      //编辑
      $scope.organizeId && console.log($scope.organizeId,'organizeId');
      getOrgById();
    }else{
      //添加
      console.log('aaaaaaa   add');
    }



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
