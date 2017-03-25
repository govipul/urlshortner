var app = angular.module('urlShortApp',[])

app.controller('urlController', ['$scope', function($scope){

  $scope.addUrl = function () {

  };

  $scope.init =function(){
    //alert("load table data");

  }
}]);

app.service('mongoDataService', function(){
  this.getData = function(){
    var data = $http({
      method: "GET",
      url: "ds137110.mlab.com:37110/urlshort -u govipul -p Dauji@1987"
    }).then(function successCallBack(response){
      console.log(response.data);
    }, function errorCallBack(response){
      console.log(response);
    });
  }
});
