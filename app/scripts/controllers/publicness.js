'use strict';

/**
 * @ngdoc function
 * @name slgjApp.controller:CounterCtrl
 * @description
 * # OrganizeCtrl
 * Controller of the slgjApp
 */
angular.module('slgjApp')
  .controller('PublicnessCtrl', ['$scope','$state','$stateParams','UserTest','Utils',function ($scope,$state,$stateParams,UserTest,Utils) {


    //1.局部变量
    $scope.publicnessId = $stateParams.id;

    var
      stateName = $state.current.name,
      moduleName = "publicness";
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
    };

    //stateType.replace(moduleName+'-','').replace(moduleName,'list')
    initByType[InitFnName] && initByType[InitFnName]();


    function getOrgById(){
      UserTest.getOrgById({id:$scope.privateId},{},function(data){
        //console.log(data);
        $scope.public = data;
      },function(){

      });
    }



    if($scope.publicId){
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
