app.service('postDataService', ['crudService', function(crudService) {
  return {
    getAllPosts: function() {
      return crudService.getAll('posts').then(function(posts) {
        return posts;
      });
    },
    addPost: function(post) {
      crudService.addOne('posts', post).then(function(post) {
        return post;
      });
    },
    deletePost: function(post_id) {
      return crudService.deleteOne('posts', post_id).then(function(post) {
        return post;
      });
    },
    editPost: function(post_id, post) {
      return crudService.editOne('posts', post_id, post).then(function(post) {
        return post;
      });
    },
    getOnePost: function(post_id) {
      return crudService.getOne('posts', post_id).then(function(post) {
        return post;
      });
    },
    addComment: function(post_id, comment) {
      return crudService.addComment('posts', post_id, comment).then(function(post) {
        return post;
      });
    }
  };
}]);

app.service('crudService', ['$http', function($http) {
  return {
    getAll: function(resource) {
      return $http({
        method: 'GET',
        url: '/'+resource,
      }).then(function(resources) {
        return resources;
      }).catch(function(err) {
        return err;
      });
    },
    getOne: function(resource, data) {
      return $http({
        method: 'GET',
        url: '/'+resource+'/'+data,
      }).then(function(resource) {
        return resource;
      }).catch(function(err) {
        return err;
      });
    },
    addOne: function(resource, data) {
      return $http({
        method: 'POST',
        url: '/'+resource,
        data: data,
      }).then(function(resources) {
        return resources;
      }).catch(function(err) {
        return err;
      });
    },
    deleteOne: function(resource, data) {
      return $http({
        method: 'DELETE',
        url: '/'+resource + '/' + data,
      }).then(function(resources) {
        return resources;
      }).catch(function(err) {
        return err;
      });
    },
    editOne: function(resource, id, data) {
      return $http({
        method: 'PUT',
        url: '/'+resource + '/' + id,
        data: data,
      }).then(function(resources) {
        return resources;
      }).catch(function(err) {
        return err;
      });
    },
    addComment: function(resource, id, data) {
      return $http({
        method: 'POST',
        url: '/'+resource+'/'+id+'/comment',
        data: data,
      }).then(function(resource) {
        return resource;
      }).catch(function(err) {
        return err;
      });
    }
  };
}]);

app.service('authService', ['$http', '$window', function($http, $window) {
  var user = {};
  return {
    login: function(user) {
      return $http({
        method: 'POST',
        url: '/auth/login',
        data: user
      });
    },
    logout: function(user) {
      user = null;
      $window.localStorage.clear();
      $window.location.href = '/';
    },
    register: function(user) {
      return $http({
        method: 'POST',
        url: '/auth/register',
        data: user
      });
    },
    setUserInfo: function(userData) {
      $window.localStorage.setItem('user', JSON.stringify(userData.data.data.user));
      $window.localStorage.setItem('token', JSON.stringify(userData.data.data.token));
    },
    getUserInfo: function() {
      return $window.localStorage.getItem('user');
    }
  };
}]);

app.service('authInterceptor', ['$window', '$q', function($window, $q){
  return {
    // always make sure to return anything you use here!
    request: function(config){
      // check for token in headers
      // config.headers['X-requested-with'] = XMLHttpRequest;
      var token = $window.localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = "Bearer " + token;
        // return $q.resolve(config);
      }
      return config;
    },
    responseError: function(err){
      // if header auth is not present throw an error
      return err;
    }
  };
}]);
