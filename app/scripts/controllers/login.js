'use strict';

/**
 * @ngdoc function
 * @name slgjApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the slgjApp
 */

angular.module('slgjApp')
  .controller('LoginCtrl', ['$scope','$state','Utils','$timeout',function ($scope,$state,Utils,$timeout) {


    //1.scope作用于的对象最先声明   
    $scope.isLoginPage = true;

    $scope.user = {};

    //2.controller局部变量  
    //var somting;




    //3.scope底下的function  
    $scope.login = function(){

      console.log(JSON.stringify($scope.user));
      //{"cardNum":"we","name":"21","cardType":"2"}
      // if($scope.member.cardNum && $scope.member.name && $scope.member.cardType){
      //   Utils.setShareData({member:$scope.member});
      //   $state.go('personnel-add');
      // }
      if($scope.user.name==='admin' && $scope.user.password==='admin'){
        $scope.user.infoError = false;
        $state.go('app.dashboard');
      }else{
          $scope.user.infoError = true;
        $timeout(function () {
          $scope.user.infoError = false;
        },2000);
      }
    }



  }]);


