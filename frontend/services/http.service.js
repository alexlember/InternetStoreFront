(function(internetStoreModule){

	var HttpService = function($http){

		this.getUsers = getUsers;
		this.addUser = addUser;
		this.delUser = delUser;

		this.getCouriers = getCouriers;
		this.addCourier = addCourier;
		this.delCourier = delCourier;

		this.getProductTypes = getProductTypes;
		this.addProductType = addProductType;
		this.delProductType = delProductType;

		this.getProducts = getProducts;
		this.addProduct = addProduct;
		this.delProduct = delProduct;

		this.getMarketingSources = getMarketingSources;
		this.addMarketingSource = addMarketingSource;
		this.delMarketingSource = delMarketingSource;

		this.getRegions = getRegions;
		this.addRegion = addRegion;
		this.delRegion = delRegion;

		this.getStreets= getStreets;
		this.addStreet = addStreet;
		this.delStreet = delStreet;

		function getUsers(successCbk, errorCbk){

			$http({
				method: 'GET',
				url: 'http://localhost:8000/internet_store/user/'
			}).then(successCbk, errorCbk);
		}

		function addUser($scope, successCbk, errorCbk){

			$http({
				method: 'POST',
				url: 'http://localhost:8000/internet_store/user/',
				headers: {
				   'Content-Type': 'application/json',
				},
				data: { 
					'userName': $scope.userName,
					'email': $scope.email
				}
			}).then(successCbk, errorCbk); 
		}

		function delUser($scope, successCbk, errorCbk){

			$http({
				method: 'DELETE',
				url: 'http://localhost:8000/internet_store/user/',
				headers: {
				   'Content-Type': 'application/json',
				},
				data: {
					'email': $scope.userToDelete 
				}
			}).then(successCbk, errorCbk); 
		}

		function getCouriers(successCbk, errorCbk){

			$http({
				method: 'GET',
				url: 'http://localhost:8000/internet_store/courier/'
			}).then(successCbk, errorCbk);
		}

		function addCourier($scope, successCbk, errorCbk){

			$http({
				method: 'POST',
				url: 'http://localhost:8000/internet_store/courier/',
				headers: {
				   'Content-Type': 'application/json',
				},
				data: { 
					'courierName': $scope.courierName,
					'email': $scope.userOfCourier
				}
			}).then(successCbk, errorCbk); 
		}

		function delCourier($scope, successCbk, errorCbk){

			$http({
				method: 'DELETE',
				url: 'http://localhost:8000/internet_store/courier/',
				headers: {
				   'Content-Type': 'application/json',
				},
				data: {
					'courierName': $scope.courierToDelete 
				}
			}).then(successCbk, errorCbk); 
		}

		function getProductTypes(successCbk, errorCbk){

			$http({
				method: 'GET',
				url: 'http://localhost:8000/internet_store/product_type/'
			}).then(successCbk, errorCbk);
		}

		function addProductType($scope, successCbk, errorCbk){

			$http({
				method: 'POST',
				url: 'http://localhost:8000/internet_store/product_type/',
				headers: {
				   'Content-Type': 'application/json',
				},
				data: { 
					'productType': $scope.productType
				}
			}).then(successCbk, errorCbk); 
		}

		function delProductType($scope, successCbk, errorCbk){

			$http({
				method: 'DELETE',
				url: 'http://localhost:8000/internet_store/product_type/',
				headers: {
				   'Content-Type': 'application/json',
				},
				data: {
					'productType': $scope.productTypeToDelete 
				}
			}).then(successCbk, errorCbk); 
		}

		function getProducts(successCbk, errorCbk){

			$http({
				method: 'GET',
				url: 'http://localhost:8000/internet_store/product/'
			}).then(successCbk, errorCbk);
		}

		function addProduct($scope, successCbk, errorCbk){

			$http({
				method: 'POST',
				url: 'http://localhost:8000/internet_store/product/',
				headers: {
				   'Content-Type': 'application/json',
				},
				data: { 
					'product': $scope.product,
					'productType': $scope.productTypeOfProduct,
					'price': $scope.price
				}
			}).then(successCbk, errorCbk); 
		}

		function delProduct($scope, successCbk, errorCbk){

			$http({
				method: 'DELETE',
				url: 'http://localhost:8000/internet_store/product/',
				headers: {
				   'Content-Type': 'application/json',
				},
				data: {
					'product': $scope.productToDelete 
				}
			}).then(successCbk, errorCbk); 
		}

		function getMarketingSources(successCbk, errorCbk){

			$http({
				method: 'GET',
				url: 'http://localhost:8000/internet_store/marketing_source/'
			}).then(successCbk, errorCbk);
		}

		function addMarketingSource($scope, successCbk, errorCbk){

			$http({
				method: 'POST',
				url: 'http://localhost:8000/internet_store/marketing_source/',
				headers: {
				   'Content-Type': 'application/json',
				},
				data: { 
					'marketingSource': $scope.marketingSource
				}
			}).then(successCbk, errorCbk); 
		}

		function delMarketingSource($scope, successCbk, errorCbk){

			$http({
				method: 'DELETE',
				url: 'http://localhost:8000/internet_store/marketing_source/',
				headers: {
				   'Content-Type': 'application/json',
				},
				data: {
					'marketingSource': $scope.marketingSourceToDelete 
				}
			}).then(successCbk, errorCbk); 
		}

		function getRegions(successCbk, errorCbk){

			$http({
				method: 'GET',
				url: 'http://localhost:8000/internet_store/region/'
			}).then(successCbk, errorCbk);
		}

		function addRegion($scope, successCbk, errorCbk){

			$http({
				method: 'POST',
				url: 'http://localhost:8000/internet_store/region/',
				headers: {
				   'Content-Type': 'application/json',
				},
				data: { 
					'region': $scope.region
				}
			}).then(successCbk, errorCbk); 
		}

		function delRegion($scope, successCbk, errorCbk){

			$http({
				method: 'DELETE',
				url: 'http://localhost:8000/internet_store/region/',
				headers: {
				   'Content-Type': 'application/json',
				},
				data: {
					'region': $scope.regionToDelete 
				}
			}).then(successCbk, errorCbk); 
		}

		function getStreets(successCbk, errorCbk){

			$http({
				method: 'GET',
				url: 'http://localhost:8000/internet_store/street/'
			}).then(successCbk, errorCbk);
		}

		function addStreet($scope, successCbk, errorCbk){

			$http({
				method: 'POST',
				url: 'http://localhost:8000/internet_store/street/',
				headers: {
				   'Content-Type': 'application/json',
				},
				data: { 
					'street': $scope.street,
					'region': $scope.streetRegion
				}
			}).then(successCbk, errorCbk); 
		}

		function delStreet($scope, successCbk, errorCbk){

			$http({
				method: 'DELETE',
				url: 'http://localhost:8000/internet_store/street/',
				headers: {
				   'Content-Type': 'application/json',
				},
				data: {
					'street': $scope.streetToDelete 
				}
			}).then(successCbk, errorCbk); 
		}
	};

	HttpService.$inject = ['$http'];
	internetStoreModule.service('HttpService', HttpService);

})(internetStoreModule);