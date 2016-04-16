window.app.controller('PostController', function($scope, post) {
  $scope.post = post;
  $scope.sort = 'rating';
});

window.app.controller('mainController', function() {
  var vm = this;
  vm.time = new Date();
});
