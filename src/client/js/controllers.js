window.app.controller('PostController', ['$scope', 'postDataService', 'post', function($scope, postDataService, post) {
  $scope.post = {};
  $scope.postObject = post;
  $scope.addPost = function() {
    postDataService.addPost(this.post);
    $scope.updatePosts();
    $scope.post = {};
  };
  $scope.updatePosts = function() {
    postDataService.getAllPosts()
      .then(function(posts) {
        console.log(posts);
        // $scope.posts = posts.data.data;
      });
  };
  $scope.deletePost = function(id) {
    postDataService.deletePost(id)
      .then(function(post) {
        $scope.updatePosts();
      });
  };
  $scope.editPost = function(id) {
    postDataService.editPost(id, this.post)
      .then(function(post) {
        $scope.updatePosts();
      });
  };
  $scope.sort = 'rating';
}]);

window.app.controller('mainController', function() {
  var vm = this;
  vm.time = new Date();
});
