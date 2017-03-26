var app = angular.module('urlShortApp',[])


app.controller('urlController', ['$scope', '$http', function($scope, $http){

    $scope.loading = false;
    $scope.init = function(){
      getData();
    };


    $scope.addUrl = function(){
      putData($scope.fullUrl)
      clear();
    };

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
