'use strict';

/**
 * @ngdoc function
 * @name slgjApp.controller:CounterCtrl
 * @description
 * # OrganizeCtrl
 * Controller of the slgjApp
 */
angular.module('slgjApp')
  .controller('CounterCtrl', ['$scope','$state','$stateParams','UserTest','Utils',function ($scope,$state,$stateParams,UserTest,Utils) {


    console.log('hello world! CounterCtrl');

    //1.局部变量
    $scope.counterId = $stateParams.id;

    var
      stateName = $state.current.name,
      moduleName = "counter";
      //console.log(stateType);
    var InitFnName = Utils.getInitFnName(moduleName,stateName);

    var initByType = {
      add:function(){
        console.log('添加');
      },
      view:function(){
        console.log('查询');
      },
      update:function(){
        console.log('修改');
      },
      list:function(){
        console.log('列表');
      }
    }

    //stateType.replace(moduleName+'-','').replace(moduleName,'list')
    initByType[InitFnName] && initByType[InitFnName]();


    function getOrgById(){
      UserTest.getOrgById({id:$scope.counterId},{},function(data){
        //console.log(data);
        $scope.counter = data;
      },function(data){

      });
    }



    if($scope.counterId){
      //编辑
      $scope.counterId && console.log($scope.counterId,'counterId');
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
