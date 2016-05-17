/**
 * Created by alembers on 5/11/16.
 */
internetStoreModule.controller('mainController', ['$scope', '$state', '$http', 'HttpService', function ($scope, $state, $http, HttpService) {

	// user dropdown list with user emails.
    $scope.users = [];
    // courier dropdown list with courier names.
    $scope.couriers = [];
    // dropdown list with product types.
    $scope.prodTypes = [];
    // dropdown list with products.
    $scope.products = [];
    // dropdown list with marketing sources.
    $scope.marketingSources = [];
    // dropdown list with regions.
    $scope.regions = [];
    // dropdown list with streets.
    $scope.streets = [];
    // response for banner.
	$scope.response = '';

	// textbox with user name.
	$scope.userName = '';
	// textbox with user email.
	$scope.email =''
	// chosen user email from delete user dropdown list.
	$scope.userToDelete ='';
	// textbox with user name.

	$scope.courierName ='';
	// chosen user email from add courier dropdown list.
	$scope.userOfCourier ='';
	// chosen courier name email from delete courier dropdown list.
	$scope.courierToDelete ='';

	// textbox with product type.
	$scope.prodType =''
	// chosen product type from delete product types dropdown list.
	$scope.productTypeToDelete ='';

	// textbox with product.
	$scope.product =''
	// chosen product type of product from dropdown list.
	$scope.productTypeOfProduct ='';
	// textbox with price of product.
	$scope.price ='';
	// chosen product from delete product dropdown list.
	$scope.productToDelete ='';

	// textbox with marketing source name.
	$scope.marketingSource =''
	// chosen marketing source from delete dropdown list.
	$scope.marketingSourceToDelete ='';

	// textbox with region name.
	$scope.region =''
	// chosen region from delete dropdown list.
	$scope.regionToDelete ='';

	// textbox with street.
	$scope.street =''
	// chosen region of street from dropdown list.
	$scope.streetRegion ='';
	// chosen street from delete street dropdown list.
	$scope.streetToDelete ='';

	// initialization referring for page load
	$scope.init = init;
	$scope.getUsers = getUsers;
	$scope.getCouriers = getCouriers;
	$scope.getProductTypes = getProductTypes;
	$scope.getProducts = getProducts;
	$scope.getMarketingSources = getMarketingSources;
	$scope.getRegions = getRegions;
	$scope.getStreets = getStreets;
	$scope.init();

	// Function initialize user and courier dropdown lists.
	function init() {
		$scope.getUsers = getUsers();
		$scope.getCouriers = getCouriers();
		$scope.getProductTypes = getProductTypes();
		$scope.getProducts = getProducts();
		$scope.getMarketingSources = getMarketingSources();
		$scope.getRegions = getRegions();
		$scope.getStreets = getStreets();
	}

	function getUsers() {
		HttpService.getUsers(
			function (positiveResponse) {
				console.log('http call get users succeed');
				$scope.users = [];
				positiveResponse.data.forEach(extractUsers);
	  		},
	  		function (negativeResponse) {
	  			console.log('http call get users failed');
	  		}
  		);
	}
		
	function getCouriers() {
		HttpService.getCouriers(
			function (positiveResponse) {
				console.log('http call get couriers succeed');
				$scope.couriers = [];
				positiveResponse.data.forEach(extractCouriers);
	  		},
	  		function (negativeResponse) {
	  			console.log('http call get users failed');
	  		}
  		);
	}

	function getProductTypes() {
		HttpService.getProductTypes(
			function (positiveResponse) {
				console.log('http call get product types succeed');
				$scope.prodTypes = [];
				positiveResponse.data.forEach(extractProdTypes);
	  		},
	  		function (negativeResponse) {
	  			console.log('http call get product types failed');
	  		}
  		);
	}

	function getProducts() {
		HttpService.getProducts(
			function (positiveResponse) {
				console.log('http call get products succeed');
				$scope.products = [];
				positiveResponse.data.forEach(extractProducts);
	  		},
	  		function (negativeResponse) {
	  			console.log('http call get products failed');
	  		}
  		);
	}

	function getMarketingSources() {
		HttpService.getMarketingSources(
			function (positiveResponse) {
				console.log('http call get marketing sources succeed');
				$scope.marketingSources = [];
				positiveResponse.data.forEach(extractMarketingSources);
	  		},
	  		function (negativeResponse) {
	  			console.log('http call get marketing sources failed');
	  		}
  		);
	}

	function getRegions() {
		HttpService.getRegions(
			function (positiveResponse) {
				console.log('http call get regions succeed');
				$scope.regions = [];
				positiveResponse.data.forEach(extractRegions);
	  		},
	  		function (negativeResponse) {
	  			console.log('http call get regions failed');
	  		}
  		);
	}

	function getStreets() {
		HttpService.getStreets(
			function (positiveResponse) {
				console.log('http call get streets succeed');
				$scope.streets = [];
				positiveResponse.data.forEach(extractStreets);
	  		},
	  		function (negativeResponse) {
	  			console.log('http call get streets failed');
	  		}
  		);
	}

	// Function adds user to the database and to the user dropdown list.
	// Email in $scope.email should be unique.
	// Name in $scope.userName can be any string.
    $scope.addUser = function() {

    	console.log('new user name: ' + $scope.userName);
    	console.log('new user email: ' + $scope.email);

    	HttpService.addUser(
    		$scope,
			function (positiveResponse) {
				console.log('http call post user succeed');
				var userEmail = $scope.email;
				$scope.users.push(userEmail);
				$scope.response = lastOperation + ' user \'' + $scope.userName + '\' with email \'' + $scope.email + '\' has been added';
				$scope.userName = null;
				$scope.email = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call post user failed');
		  		if (response.status === 400) {
	  				$scope.response = negativeResponse.data;
		  		}
	  		}
  		);
	}

    // Function deletes selected in dropdown list user from list and database.
    // Value in dropdown list should not be empty.
    $scope.delUser = function() {

    	console.log('delete user email: ' + $scope.email);

    	HttpService.delUser(
    		$scope,
			function (positiveResponse) {
				console.log('http call delete user succeed');

				$scope.init();

				$scope.response = lastOperation + ' user with email \'' + $scope.userToDelete + '\' and all his couriers has been deleted';
				$scope.userToDelete = null;
				$scope.userOfCourier = null;
				$scope.courierToDelete = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call delete user failed');
	  		}
  		);
    }

	// Function adds courier to the database and to the courier dropdown list.
	// User email in $scope.userOfCourier should not be null.
	// Courier Name in $scope.courierName should be unique.
    $scope.addCourier = function() {

    	console.log('new courier name: ' + $scope.courierName);
    	console.log('user of the courier: ' + $scope.userOfCourier);

    	HttpService.addCourier(
    		$scope,
			function (positiveResponse) {
				console.log('http call post courier succeed');
				var courierName = $scope.courierName;
				$scope.couriers.push(courierName);
				$scope.response = lastOperation + ' courier with name \'' + $scope.courierName + '\' has been added';
				$scope.courierName = null;
				$scope.userOfCourier = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call post courier failed');
		  		if (response.status === 400) {
	  				$scope.response = negativeResponse.data;
		  		}
	  		}
  		);
    }

	// Function deletes selected in dropdown list courier from list and database.
	// Value in dropdown list should not be empty.
    $scope.delCourier = function() {

    	console.log('delete courier name: ' + $scope.courierToDelete);
    	
    	HttpService.delCourier(
    		$scope,
			function (positiveResponse) {
				console.log('http call delete courier succeed');

				$scope.getCouriers = getCouriers();

				$scope.response = lastOperation + ' courier with name \'' + $scope.courierToDelete + '\' has been deleted';
				$scope.courierToDelete = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call delete courier failed');
	  		}
  		);
    }

    // Function adds product type to the database and to the prodTypes dropdown list.
	// Product type in $scope.productType should not be null and should be unique.
    $scope.addProductType = function() {

    	console.log('add product type: ' + $scope.productType);

    	HttpService.addProductType(
    		$scope,
			function (positiveResponse) {
				console.log('http call post product type succeed');
				var productType = $scope.productType;
				$scope.prodTypes.push(productType);
				$scope.response = lastOperation + ' product type \'' + $scope.productType + '\' has been added';
				$scope.productType = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call post product type failed');
		  		if (response.status === 400) {
	  				$scope.response = negativeResponse.data;
		  		}
	  		}
  		);
    }

    // Function deletes selected in dropdown list product type from list and database.
	// Value in dropdown list should not be empty.
    $scope.delProductType = function() {

    	console.log('delete product type: ' + $scope.productTypeToDelete);
    	
    	HttpService.delProductType(
    		$scope,
			function (positiveResponse) {
				console.log('http call delete product type succeed');

				$scope.getProdTypes = getProdTypes();
				$scope.getProducts = getProducts();

				$scope.response = lastOperation + ' product type with name \'' + $scope.productTypeToDelete + '\' has been deleted';
				$scope.productTypeToDelete = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call delete product type failed');
	  		}
  		);
    }

    // Function adds product to the database and to the user dropdown list.
	// Product type in $scope.productTypeOfProduct should not be empty.
	// Product in $scope.product should be unique.
	// Price should be positive and non empty.
    $scope.addProduct = function() {

    	console.log('new product : ' + $scope.product);
    	console.log('product type: ' + $scope.productTypeOfProduct);
    	console.log('product price: ' + $scope.price);

    	HttpService.addProduct(
    		$scope,
			function (positiveResponse) {
				console.log('http call post product succeed');
				var product = $scope.product;
				$scope.products.push(product);
				$scope.response = lastOperation + ' product \'' + $scope.product + '\' with product type \'' + $scope.productTypeOfProduct + '\' has been added';
				$scope.productTypeOfProduct = null;
				$scope.product = null;
				$scope.price = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call post user failed');
		  		if (response.status === 400) {
	  				$scope.response = negativeResponse.data;
		  		}
	  		}
  		);
	}

	// Function deletes selected in dropdown list product from list and database.
	// Value in dropdown list should not be empty.
    $scope.delProduct = function() {

    	console.log('delete product: ' + $scope.productToDelete);
    	
    	HttpService.delProduct(
    		$scope,
			function (positiveResponse) {
				console.log('http call delete product succeed');

				$scope.getProducts = getProducts();

				$scope.response = lastOperation + ' product \'' + $scope.productToDelete + '\' has been deleted';
				$scope.productToDelete = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call delete product failed');
	  		}
  		);
    }


    // Function adds marketing source to the database and to the marketing source dropdown list.
	// Product type in $scope.marketingSource should not be null and should be unique.
    $scope.addMarketingSource = function() {

    	console.log('add marketing source: ' + $scope.marketingSource);

    	HttpService.addMarketingSource(
    		$scope,
			function (positiveResponse) {
				console.log('http call post marketing source succeed');
				var marketingSource = $scope.marketingSource;
				$scope.marketingSources.push(marketingSource);
				$scope.response = lastOperation + ' marketing source \'' + $scope.marketingSource + '\' has been added';
				$scope.marketingSource = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call post marketing source failed');
		  		if (response.status === 400) {
	  				$scope.response = negativeResponse.data;
		  		}
	  		}
  		);
    }

    // Function deletes selected in dropdown list marketing source from list and database.
	// Value in dropdown list should not be empty.
    $scope.delMarketingSource = function() {

    	console.log('delete marketing source: ' + $scope.marketingSourceToDelete);
    	
    	HttpService.delMarketingSource(
    		$scope,
			function (positiveResponse) {
				console.log('http call delete marketing source succeed');

				$scope.getMarketingSources = getMarketingSources();

				$scope.response = lastOperation + ' marketing source \'' + $scope.marketingSourceToDelete + '\' has been deleted';
				$scope.marketingSourceToDelete = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call delete marketing source failed');
	  		}
  		);
    }

    // Function adds region to the database and to the regions dropdown list.
	// Product type in $scope.region should not be null and should be unique.
    $scope.addRegion = function() {

    	console.log('add region: ' + $scope.region);

    	HttpService.addRegion(
    		$scope,
			function (positiveResponse) {
				console.log('http call post region succeed');
				var region = $scope.region;
				$scope.regions.push(region);
				$scope.response = lastOperation + ' region \'' + $scope.region + '\' has been added';
				$scope.region = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call post region failed');
		  		if (response.status === 400) {
	  				$scope.response = negativeResponse.data;
		  		}
	  		}
  		);
    }

    // Function deletes selected in dropdown list region from list and database.
	// Value in dropdown list should not be empty.
    $scope.delRegion = function() {

    	console.log('delete region: ' + $scope.regionToDelete);
    	
    	HttpService.delRegion(
    		$scope,
			function (positiveResponse) {
				console.log('http call delete region succeed');

				$scope.getRegions = getRegions();
				$scope.getStreets = getStreets();

				$scope.response = lastOperation + ' region \'' + $scope.regionToDelete + '\' has been deleted';
				$scope.regionToDelete = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call delete region failed');
	  		}
  		);
    }

    // Function adds street to the database and to the street dropdown list.
	// Region in $scope.streetRegion should not be empty.
	// Street in $scope.street should be unique.
    $scope.addStreet = function() {

    	console.log('street region : ' + $scope.streetRegion);
    	console.log('street: ' + $scope.street);

    	HttpService.addStreet(
    		$scope,
			function (positiveResponse) {
				console.log('http call post street succeed');
				var street = $scope.street;
				$scope.street.push(street);
				$scope.response = lastOperation + ' street \'' + $scope.street + '\' with region \'' + $scope.streetRegion + '\' has been added';
				$scope.streetRegion = null;
				$scope.street = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call post street failed');
		  		if (response.status === 400) {
	  				$scope.response = negativeResponse.data;
		  		}
	  		}
  		);
	}

	// Function deletes selected in dropdown list street from list and database.
	// Value in dropdown list should not be empty.
    $scope.delStreet = function() {

    	console.log('delete street: ' + $scope.streetToDelete);
    	
    	HttpService.delStreet(
    		$scope,
			function (positiveResponse) {
				console.log('http call delete street succeed');

				$scope.getStreets = getStreets;

				$scope.response = lastOperation + ' street \'' + $scope.streetToDelete + '\' has been deleted';
				$scope.streetToDelete = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call delete street failed');
	  		}
  		);
    }

    // Function for refresh user dropdown list.
    function extractUsers(user, index, array) {
    	$scope.users.push(user.Email);
	}

	// Function for refresh courier dropdown list.
	function extractCouriers(courier, index, array) {
    	$scope.couriers.push(courier.CourierName);
	}

	// Function for refresh product types from dropdown list.
	function extractProdTypes(prodType, index, array) {
    	$scope.prodTypes.push(prodType.ProductTypeLabel);
	}

	// Function for refresh products from dropdown list.
	function extractProducts(product, index, array) {
    	$scope.products.push(product.ProductLabel);
	}

	// Function for refresh marketing sources from dropdown list.
	function extractMarketingSources(marketingSource, index, array) {
    	$scope.marketingSources.push(marketingSource.MarketingSourceLabel);
	}

	// Function for refresh regions from dropdown list.
	function extractRegions(region, index, array) {
    	$scope.regions.push(region.regionName);
	}

	// Function for refresh streets from dropdown list.
	function extractStreets(street, index, array) {
    	$scope.streets.push(street.streetName);
	}

	var lastOperation = 'Last operation: ';
}]);