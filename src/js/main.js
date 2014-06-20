require([
  "app",
  "filters"
], function(app) {

  var qsa = function(s) { return Array.prototype.slice.call(document.querySelectorAll(s)) };

  app.controller("ceoController", ["$scope", function($scope) {

    $scope.list = window.ceoData.map(function(d) {
      //remove null keys
      for (var key in d) {
        if (!d[key]) d[key] = 0;
      }
      return d;
    });

    $scope.sortDescending = false;
    $scope.lastSort = "company";

    $scope.sort = function(key) {
      qsa(".ceo-pay input:checked").forEach(function(e) { e.checked = false });
      if ($scope.lastSort == key) {
        $scope.sortDescending = !$scope.sortDescending;
      } else {
        $scope.sortDescending = !(key == "company" || key == "last_name");
      }
      $scope.lastSort = key;
      $scope.list.sort(function(a, b) {
        a = typeof a[key] == "string" ? a[key].toLowerCase() : a[key];
        b = typeof b[key] == "string" ? b[key].toLowerCase() : b[key];
        var result = 0;
        if (a < b) result = -1;
        if (a > b) result = 1;
        if ($scope.sortDescending && result) {
          result *= -1;
        }
        return result;
      });
    };

    $scope.filterExp = "*";

  }]);

  angular.bootstrap(document.querySelector("#ceoApp"), ["ceoPay"]);

});