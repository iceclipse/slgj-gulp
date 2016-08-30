'use strict';

/**
 * @ngdoc overview
 * @name slgjApp
 * @description
 * # slgjApp
 *
 * Main module of the application.
 */
angular
  .module('slgjApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'ngTouch',
    'sx.tabs',
    'pascalprecht.translate'
  ])

angular.module('slgjApp').value('serverUrl', {"api": "/api", "chat": "test.slgj.com"});


angular.module('slgjApp')
  .config(['$stateProvider','$urlRouterProvider','$translateProvider', function ($stateProvider, $urlRouterProvider,$translateProvider) {



    $translateProvider.useStaticFilesLoader({
      files:[
        {
          prefix:'/api/locale-',
          suffix:'.json'
        }
      ]
    })
    // $translateProvider.translations('en_US',{
    //   'TITLE':'zonghe guimian guanli system',
    //   'PRINT':'print'
    // });
    // $translateProvider.translations('zh_CN',{
    //   'TITLE':'综合柜面管理系统',
    //   'PRINT':'打印'
    // });



    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.preferredLanguage('en');


    // For any unmatched url, redirect to /main
    $urlRouterProvider.otherwise("login");

    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "views/login.html",
        controller: 'LoginCtrl'
      })
      .state('app', {
        url: "/app",
        templateUrl: "views/layout.html",
        abstract:true,
        controller: 'LayoutCtrl'
      })
      .state('app.dashboard', {
        url: "/dashboard",
        templateUrl: "views/dashboard.html",
        controller: 'DashboardCtrl'
      })

      //客户管理
      .state('app.personnel-add', {
        url: '/personnel-add',
        templateUrl: 'views/user/personnel-add.html',
        //resolve : {
        //  getUserInfo:  function(User,cookieStore,$q){
        //    return (cookieStore.get("loginId") && User.getUserById({uid:cookieStore.get("loginId")},{}));
        //  }
        //},
        controller: 'PersonnelCtrl'
      })
      .state('app.personnel', {
        url: '/personnel',
        templateUrl: 'views/user/personnel.html',
        controller: 'PersonnelCtrl'
      })
      .state('app.personnel-update', {
        url: '/personnel-update/:id',
        templateUrl: 'views/user/personnel-add.html',
        controller: 'PersonnelCtrl'
      })
      .state('app.personnel-view', {
        url: '/personnel-view/:id',
        templateUrl: 'views/user/personnel-info.html',
        controller: 'PersonnelCtrl'
      })
      .state('app.publicness-add', {
        url: '/publicness-add',
        templateUrl: 'views/user/publicness-add.html',
        controller: 'PublicnessCtrl'
      })
      .state('app.publicness', {
        url: '/publicness',
        templateUrl: 'views/user/publicness.html',
        controller: 'PublicnessCtrl'
      })
      .state('app.publicness-update', {
        url: '/publicness-update/:id',
        templateUrl: 'views/user/publicness-add.html',
        controller: 'PublicnessCtrl'
      })
      .state('app.publicness-view', {
        url: '/publicness-view/:id',
        templateUrl: 'views/user/publicness-info.html',
        controller: 'PublicnessCtrl'
      })
      //客户管理  end

      //现金管理
      .state('app.cash-out', {
        url: '/cash-out',
        templateUrl: 'views/cash/cash-out.html',
        controller: 'CashCtrl'
      })
      .state('app.cash-in', {
        url: '/cash-in',
        templateUrl: 'views/cash/cash-in.html',
        controller: 'CashCtrl'
      })
      .state('app.cash-reallocation', {
        url: '/cash-reallocation',
        templateUrl: 'views/cash/cash-reallocation.html',
        controller: 'CashCtrl'
      })
      .state('app.cash-count', {
        url: '/cash-count',
        templateUrl: 'views/cash/cash-count.html',
        controller: 'CashCtrl'
      })

      .state('app.get-tillbalance', {
        url: '/get-tillbalance',
        templateUrl: 'views/cash/get-tillbalance.html',
        controller: 'CashCtrl'
      })
      .state('app.get-tilltype', {
        url: '/get-tilltype',
        templateUrl: 'views/cash/get-tilltype.html',
        controller: 'CashCtrl'
      })
      .state('app.get-outin', {
        url: '/get-outin',
        templateUrl: 'views/cash/get-outin.html',
        controller: 'CashCtrl'
      })
      .state('app.get-reallocation', {
        url: '/get-reallocation',
        templateUrl: 'views/cash/get-reallocation.html',
        controller: 'CashCtrl'
      })
      .state('app.get-payment', {
        url: '/get-payment',
        templateUrl: 'views/cash/get-payment.html',
        controller: 'CashCtrl'
      })
      .state('app.get-tillprint', {
        url: '/get-tillprint',
        templateUrl: 'views/cash/get-tillprint.html',
        controller: 'CashCtrl'
      })
      //现金管理  end

      .state('app.private-open', {
        url: '/private-open',
        templateUrl: 'views/private/open.html',
        controller: 'OpenCtrl'
      })
      .state('app.private-open-book', {
        url: '/private-open-book',
        templateUrl: 'views/private/open-book.html',
        controller: 'AboutCtrl'
      })
      .state('app.private-deposit', {
        url: '/private-deposit',
        templateUrl: 'views/private/deposit.html',
        controller: 'AboutCtrl'
      })
      .state('app.private-draw', {
        url: '/private-draw',
        templateUrl: 'views/private/draw.html',
        controller: 'AboutCtrl'
      })
      .state('app.private-balance', {
        url: '/private-balance',
        templateUrl: 'views/private/balance.html',
        controller: 'AboutCtrl'
      })
      .state('app.private-detail', {
        url: '/private-detail',
        templateUrl: 'views/private/detail.html',
        controller: 'AboutCtrl'
      })
      .state('app.private-exchange', {
        url: '/private-exchange',
        templateUrl: 'views/private/exchange.html',
        controller: 'AboutCtrl'
      })
      .state('app.private-exchange-book', {
        url: '/private-exchange-book',
        templateUrl: 'views/private/exchange-book.html',
        controller: 'AboutCtrl'
      })
      .state('app.private-report', {
        url: '/private-report',
        templateUrl: 'views/private/report.html',
        controller: 'AboutCtrl'
      })
      .state('app.private-noreport', {
        url: '/private-noreport',
        templateUrl: 'views/private/noreport.html',
        controller: 'AboutCtrl'
      })
      .state('app.private-freeze', {
        url: '/private-freeze',
        templateUrl: 'views/private/freeze.html',
        controller: 'AboutCtrl'
      })
      .state('app.private-unfreeze', {
        url: '/private-unfreeze',
        templateUrl: 'views/private/unfreeze.html',
        controller: 'AboutCtrl'
      })
      .state('app.private-replace', {
        url: '/private-replace',
        templateUrl: 'views/private/replace.html',
        controller: 'AboutCtrl'
      })
      .state('app.close-account', {
        url: '/close-account',
        templateUrl: 'views/close-account.html',
        controller: 'AboutCtrl'
      })
      .state('app.change-pwd', {
        url: '/change-pwd',
        templateUrl: 'views/change-pwd.html',
        controller: 'AboutCtrl'
      })
      .state('app.private-transfer', {
        url: '/private-transfer',
        templateUrl: 'views/private/transfer.html',
        controller: 'AboutCtrl'
      })

      .state('app.public-open', {
        url: '/public-open',
        templateUrl: 'views/public/open.html',
        controller: 'AboutCtrl'
      })
      .state('app.public-deposit', {
        url: '/public-deposit',
        templateUrl: 'views/public/deposit.html',
        controller: 'AboutCtrl'
      })
      .state('app.public-draw', {
        url: '/public-draw',
        templateUrl: 'views/public/draw.html',
        controller: 'AboutCtrl'
      })
      .state('app.public-cancellation', {
        url: '/public-cancellation',
        templateUrl: 'views/public/cancellation.html',
        controller: 'AboutCtrl'
      })
      .state('app.public-freeze', {
        url: '/public-freeze',
        templateUrl: 'views/public/freeze.html',
        controller: 'AboutCtrl'
      })
      .state('app.public-unfreeze', {
        url: '/public-unfreeze',
        templateUrl: 'views/public/unfreeze.html',
        controller: 'AboutCtrl'
      })
      .state('app.public-user', {
        url: '/public-user',
        templateUrl: 'views/public/user.html',
        controller: 'AboutCtrl'
      })

      //pub-voucher
      .state('app.pub-buy', {
        url: '/pub-buy',
        templateUrl: 'views/public/pub-buy.html',
        controller: 'VoucherCtrl'
      })
      .state('app.pub-report', {
        url: '/pub-report',
        templateUrl: 'views/public/pub-report.html',
        controller: 'VoucherCtrl'
      })
      .state('app.pub-noreport', {
        url: '/pub-noreport',
        templateUrl: 'views/public/pub-noreport.html',
        controller: 'VoucherCtrl'
      })
      .state('app.pub-invalid', {
        url: '/pub-invalid',
        templateUrl: 'views/public/pub-invalid.html',
        controller: 'VoucherCtrl'
      })
      .state('app.pub-status', {
        url: '/pub-status',
        templateUrl: 'views/public/pub-status.html',
        controller: 'VoucherCtrl'
      })
      .state('app.pub-check', {
        url: '/pub-check',
        templateUrl: 'views/public/pub-check.html',
        controller: 'VoucherCtrl'
      })

      // 查询
      .state('app.find-base', {
        url: '/find-base',
        templateUrl: 'views/find/base.html',
        controller: 'AboutCtrl'
      })
      .state('app.find-register', {
        url: '/find-register',
        templateUrl: 'views/find/closed.html',
        controller: 'AboutCtrl'
      })
      .state('app.find-register-freeze', {
        url: '/find-register-freeze',
        templateUrl: 'views/find/freeze.html',
        controller: 'AboutCtrl'
      })

      //OrganizeCtrl
      .state('app.organize', {
        url: '/organize',
        templateUrl: 'views/system/organize.html',
        controller: 'OrganizeCtrl'
      })
      .state('app.organize-add', {
        url: '/organize-add',
        templateUrl: 'views/system/organize-add.html',
        controller: 'OrganizeCtrl'
      })
      .state('app.organize-update', {
        url: '/organize-update/:id',
        templateUrl: 'views/system/organize-add.html',
        controller: 'OrganizeCtrl'
      })
      .state('app.organize-view', {
        url: '/organize-view/:id',
        templateUrl: 'views/system/organize-info.html',
        controller: 'OrganizeCtrl'
      })
      //OrganizeCtrl

      //CounterCtrl
      .state('app.counter', {
        url: '/counter',
        templateUrl: 'views/system/counter.html',
        controller: 'CounterCtrl'
      })
      .state('app.counter-add', {
        url: '/counter-add',
        templateUrl: 'views/system/counter-add.html',
        controller: 'CounterCtrl'
      })
      .state('app.counter-update', {
        url: '/counter-update/:id',
        templateUrl: 'views/system/counter-add.html',
        controller: 'CounterCtrl'
      })
      .state('app.counter-view', {
        url: '/counter-view/:id',
        templateUrl: 'views/system/counter-info.html',
        controller: 'CounterCtrl'
      })
      //CounterCtrl

      // voucher
      .state('app.voucher-out', {
        url: '/voucher-out',
        templateUrl: 'views/voucher/out.html',
        controller: 'VoucherCtrl'
      })
      .state('app.voucher-in', {
        url: '/voucher-in',
        templateUrl: 'views/voucher/in.html',
        controller: 'VoucherCtrl'
      })
      .state('app.voucher-reallocation', {
        url: '/voucher-reallocation',
        templateUrl: 'views/voucher/reallocation.html',
        controller: 'VoucherCtrl'
      })
      .state('app.voucher-replace', {
        url: '/voucher-replace',
        templateUrl: 'views/voucher/replace.html',
        controller: 'VoucherCtrl'
      })

      .state('app.role', {
        url: '/role',
        templateUrl: 'views/system/role.html',
        controller: 'AboutCtrl'
      })

  }
  ]);



