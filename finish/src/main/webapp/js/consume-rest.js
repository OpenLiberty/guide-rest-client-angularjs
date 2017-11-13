// tag::module[]
var app = angular.module('consumeRest', ['ngResource']);
// end::module[]

// tag::factory[]
app.factory("artists", function($resource) {
    return $resource("http://localhost:9080/artists");
});
// end::factory[]

// tag::controller[]
app.controller("ArtistsController", function($scope, artists) {
    artists.query(function(data) {
        $scope.artists = data;
    }, function(err) {
        console.error("Error occured: ", err);
    });
});
// end::controller[]
