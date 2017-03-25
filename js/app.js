var app = angular.module('urlShortApp',[])

app.controller('urlController', ['$scope', function($scope){

  $scope.addUrl = function () {
    //alert("Test");
  };

  $scope.init =function(){
    var data1 = {
      url: "http://google.com",
      shortUrl: "http://g.com"
    };

    var data2 = {
      url: "http://youtube.com",
      shortUrl: "http://y.com"
    };

    var data3 = {
      url: "http://facebook.com",
      shortUrl: "http://f.com"
    };

    $scope.urlList = [data1, data2, data3];

  }
}]);
