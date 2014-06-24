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
    }).sort(function(a, b) { return b.total - a.total });

    $scope.sortDescending = true;
    $scope.lastSort = "total";

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

  app.directive("sortArrow", function() {
    return {
      restrict: "A",
      link: function(scope, element, attrs) {
        var column = attrs.sortArrow;
        var onSort = function(after, before, $scope) {
          var on = $scope.lastSort;
          element.removeClass("sorted up");
          if (on == column) {
            element.addClass("sorted");
            if (!$scope.sortDescending) {
              element.addClass("up");
            }
          }
        };
        scope.$watch("lastSort", onSort);
        scope.$watch("sortDescending", onSort);

      }
    }
  })

  angular.bootstrap(document.querySelector("#ceoApp"), ["ceoPay"]);

});