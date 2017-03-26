var app = angular.module('urlShortApp',[])


app.controller('urlController', ['$scope', '$http', '$window', function($scope, $http, $window){

    $scope.loading = false;
    $scope.init = function(){
      getData();
    };

    $scope.searchUrl = function(){
        var url = $scope.shortUrl;
        var hashKey = url.slice(7, url.length);
        getActualUrl(hashKey);

    }

    $scope.addUrl = function(){
      putData($scope.fullUrl)
      clear();
    };

    $scope.fillLink = function(data){
      $scope.shortUrl = data.shortUrl;
      $scope.realUrl = data.url;
    }

    var getActualUrl = function(key){
        return $http({
          method: "GET",
          url: "/getUrl/"+key
        }).then(function successCallBack(response){
            $scope.actualUrl = response.data.url;
        }, function errorCallBack(response){
            alert("Please check for key");
        });
    }

    var clear = function(){
      $scope.fullUrl = "";
    }

    var putData = function(fullUrl) {
      data = {
        "url": fullUrl
      };
      $http({
        method: "POST",
        url: "/addUrlData",
        data: data
      }).then(function successCallBack(response){
          getData();
      }, function errorCallBack(response){
          alert("It's our mistake, Please refresh page again");
          console.error(response);
      });

      //.post(, data);
    };

    var getData = function() {
      return $http ({
        method: "GET",
        url: "/getUrlLists"
      }).then(function successCallBack(response){
          $scope.urlList = response.data;
          return response.data;
      }, function errorCallBack(response){
          alert("It's our mistake, Please refresh page again");
          console.error(response);
      });
    }


}]);
