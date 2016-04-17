window.app.controller('PostController', ['$scope', 'authService', 'postDataService', function($scope, authService, postDataService) {
  $scope.post = {};
  $scope.comment = {};
  $scope.showSubmit = false;
  $scope.showComments = false;
  $scope.user = JSON.parse(authService.getUserInfo());
  console.log($scope.user);
  if ($scope.user) {
    $scope.loggedIn = true;
  } else {
    $scope.loggedIn = false;
  }
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
        $scope.posts = posts.data.data;
      });
  };
  $scope.deletePost = function(id) {
    var ans = confirm('Are you sure that you want to delete this post?');
    if (ans) {
      postDataService.deletePost(id)
        .then(function(post) {
          $scope.updatePosts();
        });
    }
  };
  $scope.editPost = function(id) {
    postDataService.getOnePost(id).then(function(post) {
      $scope.post = post.data.data;
      console.log($scope.post);
      postDataService.editPost(id, $scope.post)
        .then(function(post) {
          $scope.updatePosts();
        });
    });
  };
  $scope.addComment = function(id) {
    postDataService.addComment(id, {
      author: this.comment.name,
      message: this.comment.text,
    })
      .then(function(post) {
        $scope.updatePosts();
        $scope.comment = {};
        post.showComments = true;
      });
  };
  $scope.vote = function(id, direction) {
    postDataService.getOnePost(id).then(function(post) {
      if (direction === 'up') {
        post.data.data.votes++;
      } else {
        post.data.data.votes--;
      }
      postDataService.editPost(id, post.data.data).then(function(post) {
        $scope.updatePosts();
      });
    });
  };

  $scope.updatePosts();
  $scope.sort = 'votes';
  $scope.reverse = true;
}]);

app.controller('signupController', ['$scope', '$location', 'authService', function($scope,  $location, authService) {
  $scope.user = {};
  $scope.register = function() {
      console.log($scope.user);
      authService.register($scope.user)
        .then(function(user) {
          console.log('User: ', user);
          authService.setUserInfo(user);
          $location.path('/');
        })
        .catch(function(err) {
          // TODO - check status code and show appropriate message.
          console.log(err);
        });
  };
}]);

app.controller('loginController', ['$scope', '$location', '$window',  'authService', function($scope, $location, $window, authService) {
  $scope.user = {};
  $scope.login = function() {
      authService.login($scope.user)
        .then(function(user) {
          console.log(user);
          authService.setUserInfo(user);
          $window.location.href = '/';
        })
        .catch(function(err) {
          // TODO - check status code and show appropriate message.
          console.log(err);
        });
  };
}]);
