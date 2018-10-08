(function () {
'use strict';

angular.module('LunchApp', [])

.controller('LunchEvaluatorController', LunchEvaluatorController);
 LunchEvaluatorController.$inject =['$scope'];
 function LunchEvaluatorController($scope) {
  $scope.lunch = "";
  $scope.result = "";
  $scope.lunchSize = 0;
  $scope.evaluateLunch = function () {
    var lunchSize = $scope.lunch.split(',').filter(x=>x.trim()!='').length;

    if(lunchSize > 3){
      $scope.result = "Too much!";
    }
    else if (lunchSize > 0) {
      $scope.result = "Enjoy!";
    }
    else {
      $scope.result = "Please enter data first";
    }
    $scope.lunchSize = lunchSize;
  };
};

})();
