angular.module('mainCtrl', ['userService'])

.controller('mainController',function($scope,$rootScope, $location, Auth, User) {

//----------- used variables -----------------------------     
        $scope.LoginForm;
        $scope.validUsername ='';
        $scope.validPassword ='';
        $scope.username = '\\w+@illinois.edu';
        //$scope.user = 'Hi user';
        $scope.error;
//----------- validation Error -----------------------------
        $scope.pass_err = 'Password required';
        $scope.pass_err_length_max = 'Password is too long.';
        $scope.pass_err_length_min = 'Username is too short.';
        $scope.email_err = 'Email must be like user@illinois.edu';
        //$scope.displayName ='';
        $scope.regForm;
        $scope.userData;
        $scope.validUsernameReg;
        $scope.validPasswordReg;
        $scope.displayNameReg;
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


vm.processing = true;

		// clear the error
		vm.error = '';

			Auth.login($scope.validUsername, $scope.validPassword)
			.success(function(data) {
				vm.processing = false;			

				// if a user successfully logs in, redirect to users page
				if (data.success){	
					alert(data.success);	
					$location.path('/thankyou');
				
					 //angular.element( document.querySelector( '.modal-backdrop.fade.in' ) ).css('display','none');
				}else 
					$scope.error = data.message;
				
			});

        }; // Login form #ends

vm.user;
	// function to handle logging out
	vm.doLogout = function() {
		Auth.logout();
		vm.user = '';
		
		$location.path('/');
	};






$scope.submitRegForm = function() {
		vm.processing = true;
		vm.message = '';
		console.log("I am clicking signup");
		console.log([{"name": $scope.displayNameReg}]);
		// use the create function in the userService
		/*User.create(vm.userData)
			.success(function(data) {
				vm.processing = false;
				vm.userData = {};
				vm.message = data.message;
			});
			*/
	};		
	
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';

		// use the create function in the userService
		User.create(vm.userData)
			.success(function(data) {
				vm.processing = false;
				vm.userData = {};
				vm.message = data.message;
			});
			
	};	
	
});
