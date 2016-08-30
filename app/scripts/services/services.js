'use strict';

/**
 * @ngdoc service
 * @name slgjApp.services
 * @description
 * # services
 * Factory in the slgjApp.
 */

angular.module('slgjApp').factory("UserTest",["$resource","serverUrl",function($resource,serverUrl) {

  return $resource("/api/test", null,
    {
      testApi:{//获取推流地址
        method:"GET",
        url:"/api/test.json"
      },
      roomRides:{//
        method:"GET",
        url:serverUrl.api + "/anchor/:aid/rides",
        isArray:true
      },


      //机构管理
      //总行 分行 支行
      getOrgById:{//获取机构详情
        method:"GET",
        url:"/api/getOrgById.json",
      },
      getUserByCard:{//获取用户详情
        method:"GET",
        url:"/api/getInfoByCardNum.json",
      },


      //获取菜单列表
      getMenus:{
        method:"GET",
        url:"/api/menu.json",
        isArray:true
      }
    }
  );
}]);


/*
*factory Utils: 常用的业务操作提取
*
*
* 1.function getInitFnName: get init function name by view module name
* params[moduleName,stateName]
*
*
* */
angular.module('slgjApp').factory("Utils",[function() {
  var shareData = {};
  return {
    getInitFnName:function(moduleName,stateName){
      return stateName.replace(moduleName+'-','').replace(moduleName,'list')
    },
    //存取共享数据
    setShareData:function(obj){
      shareData = obj;
    },
    getShareData:function(){
      return shareData;
    }
  }
}]);




angular.module('slgjApp').factory("User",["$resource","serverUrl","cookieStore",function($resource,serverUrl,cookieStore) {
  var  authorization = cookieStore.get("authorization");
  return $resource(serverUrl.api + "/user",null,
    {
      auth:{
        method:"POST",
        url:serverUrl.api + "/account",
        headers:{authorization:authorization}
      },
      login:{
        method:"POST",
        url:serverUrl.api + "/user/login",
        isArray:false,
        headers:{"Content-Type":"application/x-www-form-urlencoded",authorization:authorization},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
      },
      create:{
        method:"POST",
        url:serverUrl.api + "/user"
      },changePwd:{ //修改密码
        method:"POST",
        url:serverUrl.api + "/user/:uid/change-pwd",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
      }
    }
  );
}]);



angular.module('slgjApp').factory("Msg",["$resource","serverUrl",
  function($resource,serverUrl) {
    return $resource(serverUrl.api + "/anchor", null,
      {
        getMsgUnread:{//获取未读消息数
          method:"GET",
          url:serverUrl.api + "/notices/system/:uid/unread"
        },
        getMsgList:{//获取消息列表
          method:"GET",
          url:serverUrl.api + "/notices/system/:uid"
        },
        setReadStatus:{//设置为已读
          method:"PUT",
          url:serverUrl.api + "/notices/system/:uid"
        },
        getMsgDetail:{//获取消息内容
          method:"GET",
          url:serverUrl.api + "/notices/system/:uid/message/:mid"
        },
        getNotices:{
          method:"GET",
          url:serverUrl.api + "/notices/system/:uid/topx",
          isArray:true
        }
      });
  }]);


angular.module('slgjApp').factory("AuthService",function() {
  var currentUser ;
  return {
    setUser:function(user){
      currentUser = user;
    },
    clearUser:function(){
      currentUser = null;
      return null;
    },
    isLoggedIn:function(){
      return currentUser ? true:false;
    },
    currentUser:function(){
      return currentUser;
    }
  }


});
