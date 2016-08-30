'use strict';

/**
 * @ngdoc function
 * @name slgjApp.controller:CashCtrl
 * @description
 * # CashCtrl
 * Controller of the slgjApp
 */
angular.module('slgjApp')
  .controller('CashCtrl', ['$scope','$state','$stateParams','UserTest','Utils',function ($scope,$state,$stateParams,UserTest,Utils) {

    //1.局部变量

    var
      stateName = $state.current.name,
      moduleName = "personnel";
    //console.log(stateType);
    var InitFnName = Utils.getInitFnName(moduleName,stateName);

    var initByType = {
      in:function(){
        console.log(moduleName,'moduleName');
      },
      out:function(){
        console.log(moduleName,'moduleName');
      },
      reallocation:function(){
        console.log(moduleName,'moduleName');
      },
      count:function(){
        console.log(moduleName,'moduleName');
      },
      search:function(){
        console.log(moduleName,'moduleName');
      }
    }

    initByType[InitFnName] && initByType[InitFnName]();



    $scope.amounts = [
      {val:100,name:'100元'},
      {val:50,name:'50元'},
      {val:20,name:'20元'},
      {val:10,name:'10元'},
      {val:5,name:'5元'},
      {val:1,name:'1元'},
      {val:0.5,name:'5角'},
      {val:0.1,name:'1角'},
      {val:0.05,name:'5分'},
      {val:0.02,name:'2分'},
      {val:0.01,name:'1分'}];

    $scope.classification = [
      {amount:$scope.amounts[0],complete:0,incomplete:0,halfcomplete:0}
    ];
    $scope.amounts.splice(0,1);
    $scope.selectedAmount = $scope.amounts[0];


    //1.添加券类
    $scope.addClass = function(){
      $scope.classification.push({amount:$scope.selectedAmount,complete:0,incomplete:0,halfcomplete:0});
      for(var i=0;i<$scope.amounts.length;i++){
        if($scope.amounts[i].val==$scope.selectedAmount.val){
          $scope.amounts.splice(i,1);
        }
      }
      $scope.selectedAmount = $scope.amounts[0];
    }

    //1.删除券类
    $scope.delClass = function(_index){
      $scope.amounts.push($scope.classification[_index].amount);
      $scope.classification.splice(_index,1);
      $scope.selectedAmount = $scope.amounts[0];
    }




  }]);
