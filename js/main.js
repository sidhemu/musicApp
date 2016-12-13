var app = angular.module('musicApp', []);

app.controller('musicController', function($scope, $http) {
    $scope.$watch('search', function() {
      fetch();
    });

    $scope.search = "http://104.197.128.152:8000/v1/tracks";
    function fetch() {
          $http.get($scope.search)
            .then(function(response) {
              $scope.page = response.data;
              $scope.details = response.data.results;
            });

        }

    $scope.previous = function(page){
      $http.get(page)
        .then(function(response) {
          $scope.page = response.data;
          $scope.details = response.data.results;
        });
    }

    $scope.next = function(page){
      $http.get(page)
        .then(function(response) {
          $scope.page = response.data;
          $scope.details = response.data.results;
        });
    }

    });
