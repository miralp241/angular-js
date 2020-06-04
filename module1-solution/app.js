(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.dishes = "";
  $scope.message="";

  $scope.check = function () {
    $scope.number = $scope.dishes.split(',');
    if($scope.dishes === ""){
      document.getElementById("lunch-menu").style.borderColor="red";
      document.getElementById("msg").style.color="red";
      $scope.message = "Please enter data first";
    }
    else if(($scope.number).length <= 3){
      document.getElementById("lunch-menu").style.borderColor="green";
      document.getElementById("msg").style.color="green";
      $scope.message = "Enjoy!";
    }
    else {
      document.getElementById("lunch-menu").style.borderColor="green";
      document.getElementById("msg").style.color="green";
      $scope.message = "Too much!";
    }
  };
}

})();
