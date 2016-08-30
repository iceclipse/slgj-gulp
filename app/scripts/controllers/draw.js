'use strict';

/**
 * @ngdoc function
 * @name slgjApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the slgjApp
 */

angular.module('slgjApp')
  .controller('DrawCtrl', ['$scope','$state','Utils','$document','UserTest',function ($scope,$state,Utils,$document,UserTest) {

    //1.scope作用于的对象最先声明   
    $scope.isShowPrint = false;
    $scope.account = {currencyType:1};

    //2.controller局部变量  


    //3.scope底下的function  
    $scope.checkExist = function() {
      if ($scope.account.id > 10000) {
        //存在  获取用户信息
        UserTest.getUserByCard($scope.account, {}, function (data) {
          // console.log(data);
          data.currencyType = 1;
          data.id = $scope.account.id;
          data.status = "正常";
          $scope.account = data;
        }, function (data) {
          console.error(data);
        })
      }
    }

  }]);


