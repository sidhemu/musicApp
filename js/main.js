'use strict';

var app = angular.module('musicApp', ['ngMaterial']);

app.controller('musicController',function($scope, $http,$mdPanel,$rootScope) {
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
    $http.get('http://104.197.128.152:8000/v1/genres').then(function(response){
      $rootScope.genres = response.data.results;
    });
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
    var searchBox = angular.element('body').find('#searchbox');
    if ( searchBox.length > 0 )
     {
         searchBox.on('keyup', function (event)
         {
              console.log('hello');
             if(event.which ==13){
                 var url  = $scope.search + '?title=' + encodeURI(event.target.value);
                 $http.get(url).then(function(response){
                    $scope.page = response.data;
                    $scope.details = response.data.results;
                 })
             }
         });
     }
     $scope.editTrack = editTrack;
     $scope.addTrack = addTrack;
     $rootScope.save_data = save_data;
     function editTrack(event,song){
        event.stopPropagation();
        console.log(song);
        $rootScope.song = song;
        var position = $mdPanel.newPanelPosition()
            .absolute()
            .center();
          var config = {
            attachTo: angular.element(document.body),
            disableParentScroll: this.disableParentScroll,
            templateUrl: 'panel.progress.dialog.html',
            hasBackdrop: true,
            position: position,
            trapFocus: true,
            zIndex: 150,
            clickOutsideToClose: true,
            escapeToClose: false,
            focusOnOpen: true,
          };
          var editpanel = $mdPanel.create(config);
            editpanel.open();

     }
     function addTrack(event){
        event.stopPropagation();
        $rootScope.song=null;
        var position = $mdPanel.newPanelPosition()
            .absolute()
            .center();
          var config = {
            attachTo: angular.element(document.body),
            disableParentScroll: this.disableParentScroll,
            templateUrl: 'panel.progress.dialog.html',
            hasBackdrop: true,
            position: position,
            trapFocus: true,
            zIndex: 150,
            clickOutsideToClose: true,
            escapeToClose: false,
            focusOnOpen: true,
          };
          var editpanel = $mdPanel.create(config);
            editpanel.open();

     }

     function save_data(){

      if($rootScope.song.id==null){
        $http.post("http://104.197.128.152:8000/v1/tracks",$rootScope.song);
      }
      else{
        $http.post("http://104.197.128.152:8000/v1/tracks/"+$rootScope.song.id,$rootScope.song);
      }
      editpanel.close();
     }

    });
