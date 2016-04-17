app.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/main.html',
      preventLoggedIn: false,
    })
    .when('/register', {
      templateUrl: 'partials/signup.html',
      controller: 'signupController',
      restricted: false,
      preventLoggedIn: true,
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      restricted: false,
      preventLoggedIn: true,
    })
    .when('/logout', {
      restricted: false,
      preventLoggedIn: false,
      resolve: {
        logout: function(authService, $location) {
          authService.logout();
          $location.path('/');
        }
      }
    })
    .otherwise({redirectTo: '/login'});
    $httpProvider.interceptors.push('authInterceptor');
});

app.run(function($rootScope, $location, $window, authService) {
  // check if token is there
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    // if restricted and no token
    if (next.restricted && !$window.localStorage.getItem('token')) {
      $location.path('/login');
    }
    // if token and prevent logged in
    if ($window.localStorage.getItem('token') && next.preventLoggedIn) {
      $location.path('/');
    }
  });
});
