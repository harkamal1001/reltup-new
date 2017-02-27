angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		// route for the home page
	
		// login page
		.when('/', {
			templateUrl : 'app/views/pages/login.html',
   			controller  : 'mainController',
    			controllerAs: 'login'
		})
		
		// show all users
		.when('/users', {
			templateUrl: 'app/views/pages/users/rating.html',
			controller: 'billController',
			controllerAs: 'bill'
		})

		// form to create a new user
		// same view as edit page
		.when('/users/create', {
			templateUrl: 'app/views/pages/signup.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})
			.when('/admin', {
			templateUrl: 'app/views/pages/admin.html',
			controller: 'adminController',
			controllerAs: 'user'
		})
         		.when('/summary', {
			templateUrl: 'app/views/pages/summary.html',
			controller: 'billController',
			controllerAs: 'bill'
		})
        .when('/feedback', {
			templateUrl: 'app/views/pages/Feedback.html',
			controller: 'adminController',
			controllerAs: 'user'
		})

		// page to edit a user
		.when('/users/:user_id', {
			templateUrl: 'app/views/pages/users/single.html'/*,
			controller: 'userEditController',
			controllerAs: 'user'*/
		})
		.when('/thankyou', {
			templateUrl: 'app/views/pages/users/thankyou.html',
			controller: '',
			controllerAs: ''
		});

	$locationProvider.html5Mode(true);

});
