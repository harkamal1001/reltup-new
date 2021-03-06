angular.module('mainCtrl', ['userService'])

.controller('mainController',function($scope,$rootScope, $location, Auth, User) {

//----------- used variables -----------------------------     
        $scope.LoginForm;
        $scope.validUsername ='';
        $scope.validPassword ='';
        $scope.username = '\\w+@illinois.edu';
        $scope.user = '';
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
        $scope.validUsernameForget;
	var vm = this;

	// get info if a person is logged in
	vm.loggedIn = Auth.isLoggedIn();

	// check to see if a user is logged in on every request
	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();	
		console.log(Auth.isLoggedIn());
		// get user information on page load
		Auth.getUser()
			.then(function(data) {
				 //$scope.user = data.data;
				console.log(data);
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
					//alert(data.success);	
					$location.path('/thankyou');
					var clickable = document.getElementById("LoginFormClose") ; for(var i=0; i<50; i++) {clickable.click()};
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
		// console.log(vm);
		vm.processing = true;
		vm.message = '';
		// console.log("I am clicking signup");
		$scope.userData ={
			'name': $scope.displayNameReg , 
			'username': $scope.validUsernameReg ,  
			'password': $scope.validPasswordReg
		};
		// use the create function in the userService
		User.create($scope.userData)
			.success(function(data) {
				vm.processing = false;
				vm.userData = {};
				vm.message = data.message;
				var clickable = document.getElementById("RegFormClose") ; for(var i=0; i<50; i++) {clickable.click()};
				//alert(data.message);
				//angular.element('.close').triggerHandler('click');
				//angular.element('.close').trigger('click');
			});	

	};	

var userFound= false;	
findUser = function(usernameFind){
User.all().success(function(data){
	//console.log(angular.fromJson(data));
	var data_var = angular.fromJson(data);
	//console.log(data.length);
	var i=0, len=data.length;
    for (i; i<len; i++) {
      if (data[i].username == usernameFind) {
        //console.log(i);
        console.log(data[i]._id);
        return data[i]._id;
      }
    }
  
})
};


$scope.submitForgetForm = function(){

	User.all().success(function(data){
	//console.log(angular.fromJson(data));
	var data_var = angular.fromJson(data);
	//console.log(data.length);
	var i=0, len=data.length;
    for (i; i<len; i++) {
      if (data[i].username == $scope.validUsernameForget) {
        //console.log(i);
        console.log(data[i]._id);
        //alert("your code is 5599.");

      }
    }
  
})
}





});
