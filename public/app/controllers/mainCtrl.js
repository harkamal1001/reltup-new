angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, Auth) {
var vm = this;
//----------- used variables -----------------------------     
        vm.LoginForm;
        vm.validUsername ='';
        vm.validPassword ='';
        vm.username = '\\w+@illinois.edu';
        vm.user = 'Hi user';
        vm.error;
//----------- validation Error -----------------------------
        vm.pass_err = 'Password required';
        vm.pass_err_length_max = 'Password is too long.';
        vm.pass_err_length_min = 'Username is too short.';
        vm.email_err = 'Email must be like user@illinois.edu';
        


	

	// get info if a person is logged in
	vm.loggedIn = Auth.isLoggedIn();

	// check to see if a user is logged in on every request
	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();	

		// get user information on page load
		Auth.getUser()
			.then(function(data) {
				vm.user = data.data;
			});	
	});	

	// function to handle login form
	vm.doLogin = function() {
		vm.processing = true;

		// clear the error
		vm.error = '';

		Auth.login(vm.loginData.username, vm.loginData.password)
			.success(function(data) {
				vm.processing = false;			

				// if a user successfully logs in, redirect to users page
				if (data.success)			
					$location.path('/users');
				else 
					vm.error = data.message;
				
			});
	};

	// function to handle logging out
	vm.doLogout = function() {
		Auth.logout();
		vm.user = '';
		
		$location.path('/');
	};

	vm.createSample = function() {
		Auth.createSampleUser();
	};

});
