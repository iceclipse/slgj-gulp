'use strict';

/**
 * @ngdoc function
 * @name slgjApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the slgjApp
 */

angular.module('slgjApp')
  .controller('TransferCtrl', ['$scope','$state','Utils','$document','UserTest',function ($scope,$state,Utils,$document,UserTest) {

    //1.scope作用于的对象最先声明
     
    $scope.isShowPrint = false;
    $scope.account = {currencyType:1};

    //2.controller局部变量  


    //3.scope底下的function  

    //查询转出账户
    $scope.checkToExist = function() {
      if ($scope.trans.toId > 10000) {
        //存在  获取用户信息
        UserTest.getUserByCard($scope.trans, {}, function (data) {
           console.log(data);
          $scope.trans = {toId:$scope.trans.toId,toName:"张三"};
          $scope.trans.outError = false;
        }, function (data) {
          $scope.trans.outError = true;
          console.error(data);
        });
      }else{
        $scope.trans.outError = true;
        $scope.trans.toName = '';
      }
    };



    $scope.checkExist = function() {
      if ($scope.trans.id > 10000) {
        //存在  获取用户信息
        UserTest.getUserByCard($scope.trans, {}, function (data) {
          // console.log(data);
          data.id = $scope.trans.id;
          data.toId = $scope.trans.toId;
          data.toName = "张三";
          $scope.trans = data;
        }, function (data) {
          console.error(data);
        });
      }
    };

  }]);


