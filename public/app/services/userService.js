angular.module('userService', [])

.factory('User', function($http) {

	// create a new object
	var userFactory = {};

	// get a single user
	userFactory.get = function(id) {
		return $http.get('/api/users/' + id);
	};

	// get all users
	userFactory.all = function() {
		return $http.get('/api/users/');
	};

	// create a user
	userFactory.create = function(userData) {
		return $http.post('/api/users/', userData);
	};

	// update a user
	userFactory.update = function(id, userData) {
		return $http.put('/api/users/' + id, userData);
	};

	// delete a user
	userFactory.delete = function(id) {
		return $http.delete('/api/users/' + id);
	};

	// return our entire userFactory object
	return userFactory;

})
.factory('billfac', function($http) {

	// create a new object
	var billFactory = {};

	// get a single bill
	billFactory.get = function(id) {
		return $http.get('/api/bills/' + id);
	};

	// get all bills
	billFactory.all = function() {
		return $http.get('/api/bills/');
	};

	// create a bill
	billFactory.create = function(billData) {
		return $http.post('/api/bills/', billData);
	};

	// update a bill
	billFactory.update = function(id, billData) {
		return $http.put('/api/bills/' + id, billData);
	};

	// delete a bill
	billFactory.delete = function(id) {
		return $http.delete('/api/bills/' + id);
	};

	// return our entire billFactory object
	return billFactory;

});