'use strict';

/**
 * @ngdoc function
 * @name slgjApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the slgjApp
 */

angular.module('slgjApp')
  .controller('OpenCtrl', ['$scope','$rootScope','$state','Utils','$document','UserTest',function ($scope,$rootScope,$state,Utils,$document,UserTest) {

    //1.scope作用于的对象最先声明   
    //$scope.somting = {};
    $scope.isShowPrint = false;
    $scope.member = {cardType:1};

    //2.controller局部变量  
    //var somting;

    var initBaseInfo = function(){
      $scope.member.accountType = "储蓄卡";
      $scope.member.maturityType = "活期";
      $scope.member.currency = "吉布提法郎";
    }


    //3.scope底下的function  
    $scope.checkExist = function() {
      var addTab = {
        "id": "1001",
        "name": "添加个人客户",
        "level": 5,
        "language": "",
        "url": "views/user/personnel-add.html",
        "controller": "PersonnelCtrl"
      };

      if ($scope.member.cardNum == 11111) {
        //不存在
        Utils.setShareData({member: $scope.member});
        //$state.go('app.personnel-add');
        //打开创建客户

        $rootScope.addTabFn(addTab);
        initBaseInfo();

      } else if ($scope.member.cardNum > 11111) {
        //存在  获取用户信息
        UserTest.getUserByCard($scope.member, {}, function (data) {
          // console.log(data);
          data.cardNum = $scope.member.cardNum;
          data.cardType = $scope.member.cardType;

          $scope.member = data;
          initBaseInfo();

        }, function (data) {
          console.error(data);
        })
      }
    }



  }]);


