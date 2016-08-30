'use strict';

/**
 * @ngdoc function
 * @name slgjApp.controller:CounterCtrl
 * @description
 * # OrganizeCtrl
 * Controller of the slgjApp
 */
angular.module('slgjApp')
  .controller('PersonnelCtrl', ['$scope','$state','$stateParams','UserTest','Utils',function ($scope,$state,$stateParams,UserTest,Utils) {


    //1.局部变量

    $scope.member = Utils.getShareData().member || {};
    $scope.member.countryId = $scope.member.countryId || 253;
    // $scope.member.num = $stateParams.id;
    console.log('获取共享数据：',JSON.stringify($scope.member));

    var
      stateName = $state.current.name,
      moduleName = "personnel";
    var InitFnName = Utils.getInitFnName(moduleName,stateName);

    var initByType = {
      add:function(){
        console.log(moduleName,'添加');
      },
      view:function(){
        console.log(moduleName,'查询');
      },
      update:function(){
        console.log(moduleName,'修改');
      },
      list:function(){
        console.log(moduleName,'列表');
      }
    }

    $scope.add = function () {
      //console.log($scope.member);
      $scope.member.num = 100000;
      $scope.result = {type:"succ",msg:"添加成功，关闭当前页签继续上一步！"};
      //数据保存成功 返回操作

    }



    //stateType.replace(moduleName+'-','').replace(moduleName,'list')
    initByType[InitFnName] && initByType[InitFnName]();


    function getOrgById(){
      UserTest.getOrgById({id:$scope.personnelId},{},function(data){
        //console.log(data);
        $scope.personnel = data;
      },function(data){

      });
    }



    if($scope.personnelId){
      //编辑
      getOrgById();
    }else{
      //添加
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
