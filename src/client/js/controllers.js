window.app.controller('PostController', ['$scope', 'postDataService', function($scope, postDataService) {
  $scope.post = {};
  $scope.comment = {};
  $scope.showSubmit = false;
  $scope.showComments = false;
  $scope.addPost = function() {
    postDataService.addPost({
      title: this.post.title,
      author: this.post.author,
      image_url: this.post.image_url,
      description: this.post.description,
      votes: 0,
      postedAt: new Date(),
      comments: [],
      showComments: false,
      postComment: false,
    });
    $scope.updatePosts();
    $scope.post = {};
    $scope.showSubmit = false;
  };
  $scope.updatePosts = function() {
    postDataService.getAllPosts()
      .then(function(posts) {
        console.log(posts);
        $scope.posts = posts.data.data;
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
  $scope.addComment = function(id) {
    postDataService.addComment(id, this.comment)
      .then(function(post) {
        $scope.updatePosts();
      });
  };
  $scope.updatePosts();
  $scope.sort = 'rating';
}]);
//
// window.app.controller('mainController', function() {
//   var vm = this;
//   vm.time = new Date();
// });
