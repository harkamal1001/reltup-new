angular.module('mainCtrl', [])

.controller('mainController',function($scope,$rootScope, $location, Auth) {

//----------- used variables -----------------------------     
        $scope.LoginForm;
        $scope.validUsername ='';
        $scope.validPassword ='';
        $scope.username = '\\w+@illinois.edu';
        $scope.user = 'Hi user';
        $scope.error;
//----------- validation Error -----------------------------
        $scope.pass_err = 'Password required';
        $scope.pass_err_length_max = 'Password is too long.';
        $scope.pass_err_length_min = 'Username is too short.';
        $scope.email_err = 'Email must be like user@illinois.edu';
        


	var vm = this;

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

$scope.submitLoginForm = function() {
            $scope.processing = true;

            // clear the error
            $scope.error = '';
            //check to make sure the form is completely valid
            if ($scope.LoginForm.$valid) {
                alert("Valid login form");
                $scope.processing = true;

                // clear the error
                $scope.error = '';

                Auth.login($scope.LoginForm.validUsername, $scope.LoginForm.validPassword)
                    .success(function(data) {
                        $scope.processing = false;			

                        // if a user successfully logs in, redirect to users page
                        if (data.success)			
                            $location.path('/users');
                        else 
                            $scope.error = data.message;

                    });
     
            }
        }; // Login form #ends



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
