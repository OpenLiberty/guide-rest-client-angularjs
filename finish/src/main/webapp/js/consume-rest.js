var app = angular.module('consumeRestApp', ['ngResource']);

app.factory("artists", function($resource) {
    return $resource("http://localhost:9080/artists");
});

app.controller("ArtistsCtrl", function($scope, artists) {
    artists.query(function(data) {
        $scope.artists = data;
    }, function(err) {
        console.error("Error occured: ", err);
    });
});
