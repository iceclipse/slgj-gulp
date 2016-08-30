'use strict';

/**
 * @ngdoc service
 * @name slgjApp.User
 * @description
 * # User
 * Factory in the slgjApp.
 */
angular.module('slgjApp')
  .factory('User', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
