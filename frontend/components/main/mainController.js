/**
 * Created by alembers on 5/11/16.
 */
internetStoreModule.controller('mainController', ['$scope', '$state', '$http', 'HttpService', function ($scope, $state, $http, HttpService) {

	// user drop down list with user emails.
    $scope.users = [];
    // courier drop down list with names of all couriers.
    $scope.couriers = [];
    // courier drop down list with names of couriers of specific user.
    $scope.categorisedCouriers = [];
    // drop down list with product types.
    $scope.prodTypes = [];
    // drop down list with all products.
    $scope.products = [];
    // drop down list with specified products of some productType.
    $scope.categorisedProducts = [];
    // drop down list with marketing sources.
    $scope.marketingSources = [];
    // drop down list with regions.
    $scope.regions = [];
    // drop down list with streets.
    $scope.streets = [];
    // drop down list with specified streets of some region.
    $scope.categorisedStreets = [];
    // response for banner.
	$scope.response = '';

	// text box with user name.
	$scope.userName = '';
	// text box with user email.
	$scope.email ='';
	// chosen user email from delete user drop down list.
	$scope.userToDelete ='';
	// text box with user name.

	$scope.courierName ='';
	// chosen user email from add courier drop down list.
	$scope.userOfCourier ='';
	// chosen courier name email from delete courier drop down list.
	$scope.courierToDelete ='';

	// text box with product type.
	$scope.prodType ='';
	// chosen product type from delete product types drop down list.
	$scope.productTypeToDelete ='';

	// text box with product.
	$scope.product ='';
	// chosen product type of product from drop down list.
	$scope.productTypeOfProduct ='';
	// text box with price of product.
	$scope.price ='';
	$scope.currentProductPrice = '';
	// chosen product from delete product drop down list.
	$scope.productToDelete ='';

	// text box with marketing source name.
	$scope.marketingSource ='';
	// chosen marketing source from delete drop down list.
	$scope.marketingSourceToDelete ='';

	// text box with region name.
	$scope.region ='';
	// chosen region from delete drop down list.
	$scope.regionToDelete ='';

	// text box with street.
	$scope.street ='';
	// chosen region of street from drop down list.
	$scope.streetRegion ='';
	// chosen street from delete street drop down list.
	$scope.streetToDelete ='';
	$scope.totalSum = 0;
	$scope.orderDate ='';
	$scope.orderTime = '';


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
				updateUserCouriers();
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
				updateUserCouriers();
	  		},
	  		function (negativeResponse) {
	  			console.log('http call get couriers failed');
	  		}
  		);
	}

	function getProductTypes() {
		HttpService.getProductTypes(
			function (positiveResponse) {
				console.log('http call get product types succeed');
				$scope.prodTypes = [];
				positiveResponse.data.forEach(extractProdTypes);
				updateProducts();
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
				updateProducts();
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
				updateStreets();
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
				updateStreets();
	  		},
	  		function (negativeResponse) {
	  			console.log('http call get streets failed');
	  		}
  		);
	}

	// Function generates random delivery for selected user save it to database and upload it to Delivery Heat Map service.
	// User in $scope.userRandomDelivery should not be empty.
    $scope.generateDelivery = function() {

    	console.log('user to generate delivery: ' + $scope.userRandomDelivery);

    	HttpService.generateDelivery(
    		$scope,
			function (positiveResponse) {
				console.log('http get generate succeed');
				$scope.response = lastOperation + ' random delivery was generated for user \'' + $scope.userRandomDelivery + '\'';
				$scope.userRandomDelivery = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call get generate failed');
		  		if (negativeResponse.status === 400) {
	  				$scope.response = negativeResponse.data;
		  		}
	  		}
  		);
	};

	// Function reloads all deliveries to DeliveryHeatMap for selected user.
	// User in $scope.userReloadDeliveries should not be empty.
    $scope.reloadDeliveries = function() {

    	console.log('user to reload deliveries: ' + $scope.userReloadDeliveries);

    	HttpService.reloadDeliveries(
    		$scope,
			function (positiveResponse) {
				console.log('http get reload succeed');
				$scope.response = lastOperation + ' all deliveries were reloaded for user \'' + $scope.userReloadDeliveries + '\'';
				$scope.userReloadDeliveries = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call get reload failed');
		  		if (negativeResponse.status === 400) {
	  				$scope.response = negativeResponse.data;
		  		}
	  		}
  		);
	};

	// Function save delivery to DeliveryHeatMap for selected user.
	// All fields in custom delivery should not be empty.
    $scope.saveDelivery = function() {
    	console.log('Ready to save delivery');
    	console.log('Delivery user: ' + $scope.customDeliveryUser);
    	console.log('Delivery courier: ' + $scope.customDeliveryCourier);
    	console.log('Product type: ' + $scope.customDeliveryProductType);
    	console.log('Product: ' + $scope.customDeliveryProduct);
    	console.log('Quantity: ' + $scope.quantity);
    	console.log('Region: ' + $scope.customDeliveryRegion);
    	console.log('Street: ' + $scope.customDeliveryStreet);
    	console.log('Marketing source: ' + $scope.customDeliveryMarketingSource);
    	console.log('Home: ' + $scope.home);
    	console.log('Building: ' + $scope.building);
    	console.log('Delivery date: ' + $scope.orderDate);
    	console.log('Delivery time: ' + $scope.orderTime);

    	HttpService.saveDelivery(
    		$scope,
			function (positiveResponse) {
				console.log('http post save delivery succeed');
				$scope.response = lastOperation + ' delivery was saved for user \'' + $scope.customDeliveryUser + '\'';
				$scope.userReloadDeliveries = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call post reload failed');
		  		if (negativeResponse.status === 400) {
	  				$scope.response = negativeResponse.data;
		  		}
	  		}
  		);
	};

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

				var Email = $scope.email;
				var UserName = $scope.userName;
				var user = {};
				user.UserName = UserName;
				user.Email = Email;			

				$scope.users.push(user);
				$scope.response = lastOperation + ' user \'' + $scope.userName + '\' with email \'' + $scope.email + '\' has been added';
				$scope.userName = null;
				$scope.email = null;
				// $scope.customDeliveryUser = null;
				// $scope.cusctomDeliveryCourier = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call post user failed');
		  		if (negativeResponse.status === 400) {
		  			$scope.response = negativeResponse.data ;
		  		} else if (negativeResponse.status === 500) {
	  				$scope.response = 'internal server error, status 500';
		  		}
	  		}
  		);
	};

    // Function deletes selected in dropdown list user from list and database.
    // Value in dropdown list should not be empty.
    $scope.delUser = function() {

    	console.log('delete user email: ' + $scope.email);

    	HttpService.delUser(
    		$scope,
			function (positiveResponse) {
				console.log('http call delete user succeed');

				$scope.getUsers = getUsers();
				$scope.getCouriers = getCouriers();


				$scope.response = lastOperation + ' user with email \'' + $scope.userToDelete + '\' and all his couriers has been deleted';
				dropUserSelections();
	  		},
	  		function (negativeResponse) {
	  			console.log('http call delete user failed');
	  		}
  		);
    };

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

				var CourierName = $scope.courierName;
				var CourierUser = $scope.userOfCourier;
				var courier = {};
				courier.CourierName = CourierName;
				courier.CourierUser = CourierUser;
				$scope.couriers.push(courier);
				updateUserCouriers();


				$scope.response = lastOperation + ' courier with name \'' + $scope.courierName + '\' for user \'' + $scope.userOfCourier + '\ has been added';
				$scope.courierName = null;
				$scope.userOfCourier = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call post courier failed');
		  		if (negativeResponse.status === 400) {
		  			$scope.response = negativeResponse.data ;
		  		} else if (negativeResponse.status === 500) {
	  				$scope.response = 'internal server error, status 500';
		  		}
	  		}
  		);
    };

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

				dropCourierSelections();
	  		},
	  		function (negativeResponse) {
	  			console.log('http call delete courier failed');
	  		}
  		);
    };

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
		  		if (negativeResponse.status === 400) {
		  			$scope.response = negativeResponse.data ;
		  		} else if (negativeResponse.status === 500) {
	  				$scope.response = 'internal server error, status 500';
		  		}
	  		}
  		);
    };

    // Function deletes selected in dropdown list product type from list and database.
	// Value in dropdown list should not be empty.
    $scope.delProductType = function() {

    	console.log('delete product type: ' + $scope.productTypeToDelete);
    	
    	HttpService.delProductType(
    		$scope,
			function (positiveResponse) {
				console.log('http call delete product type succeed');

				$scope.getProductTypes = getProductTypes();
				$scope.getProducts = getProducts();

				$scope.response = lastOperation + ' product type with name \'' + $scope.productTypeToDelete + '\' and all its products has been deleted';
				dropProductTypeSelections();
	  		},
	  		function (negativeResponse) {
	  			console.log('http call delete product type failed');
	  		}
  		);
    };

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

				var ProductLabel = $scope.product;
				var ProductType = $scope.productTypeOfProduct;
				var Price = $scope.price;
				
				var p = {};
				p.ProductLabel = ProductLabel;
				p.ProductType = ProductType;
				p.Price = Price;
				$scope.products.push(p);
				updateProducts();

				$scope.response = lastOperation + ' product \'' + $scope.product + '\' with product type \'' + $scope.productTypeOfProduct + '\' has been added';
				$scope.productTypeOfProduct = null;
				$scope.product = null;
				$scope.price = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call post user failed');
		  		if (negativeResponse.status === 400) {
		  			$scope.response = negativeResponse.data ;
		  		} else if (negativeResponse.status === 500) {
	  				$scope.response = 'internal server error, status 500';
		  		}
	  		}
  		);
	};

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
				dropProductSelections();
	  		},
	  		function (negativeResponse) {
	  			console.log('http call delete product failed');
	  		}
  		);
    };


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
		  		if (negativeResponse.status === 400) {
		  			$scope.response = negativeResponse.data ;
		  		} else if (negativeResponse.status === 500) {
	  				$scope.response = 'internal server error, status 500';
		  		}
	  		}
  		);
    };

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
				dropMarketingSourceSelections();
	  		},
	  		function (negativeResponse) {
	  			console.log('http call delete marketing source failed');
	  		}
  		);
    };

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
		  		if (negativeResponse.status === 400) {
		  			$scope.response = negativeResponse.data ;
		  		} else if (negativeResponse.status === 500) {
	  				$scope.response = 'internal server error, status 500';
		  		}
	  		}
  		);
    };

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

				$scope.response = lastOperation + ' region \'' + $scope.regionToDelete + '\' and all its streets has been deleted';
				dropRegionSelections();
	  		},
	  		function (negativeResponse) {
	  			console.log('http call delete region failed');
	  		}
  		);
    };

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

				var StreetName = $scope.street;
				var Region = $scope.streetRegion;
				var s = {};
				s.StreetName = StreetName;
				s.Region = Region;
				$scope.streets.push(s);
				updateStreets();
				$scope.response = lastOperation + ' street \'' + $scope.street + '\' with region \'' + $scope.streetRegion + '\' has been added';
				$scope.streetRegion = null;
				$scope.street = null;
	  		},
	  		function (negativeResponse) {
	  			console.log('http call post street failed');
	  			
		  		if (negativeResponse.status === 400) {
		  			$scope.response = negativeResponse.data ;
		  		} else if (negativeResponse.status === 500) {
	  				$scope.response = 'internal server error, status 500';
		  		}
	  		}
  		);
	};

	// Function deletes selected in dropdown list street from list and database.
	// Value in dropdown list should not be empty.
    $scope.delStreet = function() {

    	console.log('delete street: ' + $scope.streetToDelete);
    	
    	HttpService.delStreet(
    		$scope,
			function (positiveResponse) {
				console.log('http call delete street succeed');

				$scope.getStreets = getStreets();

				$scope.response = lastOperation + ' street \'' + $scope.streetToDelete + '\' has been deleted';
				dropStreetSelections();
	  		},
	  		function (negativeResponse) {
	  			console.log('http call delete street failed');
	  		}
  		);
    };

    $scope.quantityChange = function() {
    	$scope.totalSum = $scope.currentProductPrice * $scope.quantity;
    };

    $scope.productChange = function() {
    	$scope.quantity = 1;
    	if (typeof $scope.customDeliveryProduct === "undefined") {
    		$scope.totalSum = 0;
    	} else {
    		$scope.categorisedProducts.forEach(extractProductPrice);
    		$scope.totalSum = $scope.currentProductPrice;
    	}
    };

    // Function for refresh specific products dropdown list.
	function extractProductPrice(product, index, array) {
		if (product.ProductLabel === $scope.customDeliveryProduct) {
			$scope.currentProductPrice = parseFloat(product.Price);
		}
	}

    $scope.customDeliveryUserUpdate = function() {
		updateUserCouriers();
	};


	function updateUserCouriers() {
		$scope.categorisedCouriers = [];
		$scope.customDeliveryCourier = null;
		$scope.couriers.forEach(extractCategorisedCouriers);
	}

	// Function for refresh specific user courier dropdown list.
	function extractCategorisedCouriers(courier, index, array) {
		if (courier.CourierUser === $scope.customDeliveryUser) {
			$scope.categorisedCouriers.push(courier);
		}
	}

	$scope.customDeliveryProductsUpdate = function() {
		updateProducts();
	};


	function updateProducts() {
		$scope.categorisedProducts = [];
		$scope.customDeliveryProduct = null;
		$scope.products.forEach(extractCategorisedProducts);
	}

	// Function for refresh specific products dropdown list.
	function extractCategorisedProducts(product, index, array) {
		if (product.ProductType === $scope.customDeliveryProductType) {
			$scope.categorisedProducts.push(product);
		}
	}

	$scope.customDeliveryStreetsUpdate = function() {
		updateStreets();
	};

	function updateStreets() {
		$scope.categorisedStreets = [];
		$scope.customDeliveryStreet = null;
		$scope.streets.forEach(extractCategorisedStreets);
	}

	// Function for refresh specific streets dropdown list.
	function extractCategorisedStreets(street, index, array) {
		if (street.Region === $scope.customDeliveryRegion) {
			$scope.categorisedStreets.push(street);
		}
	}

    // Function for refresh user dropdown list.
    function extractUsers(user, index, array) {
    	var u = {};
    	u.UserName = user.UserName;
    	u.Email = user.Email;
    	$scope.users.push(u);
	}

	// Function for refresh courier dropdown list.
	function extractCouriers(courier, index, array) {
		var c = {};
    	c.CourierName = courier.CourierName;
    	c.CourierUser = courier.CourierUser;
    	$scope.couriers.push(c);
	}

	// Function for refresh product types from dropdown list.
	function extractProdTypes(prodType, index, array) {
    	$scope.prodTypes.push(prodType.ProductTypeName);
	}

	// Function for refresh products from dropdown list.
	function extractProducts(product, index, array) {
		var p = {};
    	p.ProductLabel = product.ProductLabel;
    	p.Price = product.Price;
    	p.ProductType = product.ProductType;
    	$scope.products.push(p);
	}

	// Function for refresh marketing sources from dropdown list.
	function extractMarketingSources(marketingSource, index, array) {
    	$scope.marketingSources.push(marketingSource.MarketingSourceLabel);
	}

	// Function for refresh regions from dropdown list.
	function extractRegions(region, index, array) {
    	$scope.regions.push(region.RegionName);
	}

	// Function for refresh streets from dropdown list.
	function extractStreets(street, index, array) {
		var s = {};
    	s.StreetName = street.StreetName;
    	s.Region = street.Region;
    	$scope.streets.push(s);
	}

	function dropUserSelections() {
		$scope.userRandomDelivery = null;
		$scope.userReloadDeliveries = null;
		$scope.customDeliveryUser = null;
		$scope.customDeliveryCourier = null;
		$scope.userName = null;
		$scope.email = null;
		$scope.userToDelete = null;
		$scope.courierName = null;
		$scope.userOfCourier = null;
		$scope.courierToDelete = null;
	}

	function dropCourierSelections() {
		$scope.customDeliveryCourier = null;
		$scope.courierName = null;
		$scope.userOfCourier = null;
		$scope.courierToDelete = null;
	}

	function dropProductTypeSelections() {
		$scope.productType = null;
		$scope.productTypeToDelete = null;
		$scope.product = null;
		$scope.price = null;
		$scope.productTypeOfProduct = null;
		$scope.productToDelete = null;
		$scope.customDeliveryProductType = null;
		$scope.cusctomDeliveryProduct = null;
		$scope.totalSum = 0;
		$scope.quantity = 1;
	}

	function dropProductSelections() {
		$scope.product = null;
		$scope.price = null;
		$scope.productTypeOfProduct = null;
		$scope.productToDelete = null;
		$scope.cusctomDeliveryProduct = null;
		$scope.totalSum = 0;
		$scope.quantity = 1;
	}

	function dropMarketingSourceSelections() {
		$scope.marketingSource = null;
		$scope.marketingSourceToDelete = null;
		$scope.customDeliveryMarketingSource = null;
	}

	function dropRegionSelections() {
		$scope.region = null;
		$scope.regionToDelete = null;
		$scope.street = null;
		$scope.streetRegion = null;
		$scope.streetToDelete = null;
		$scope.customDeliveryRegion = null;
		$scope.customDeliveryStreet = null;
	}

	function dropStreetSelections() {
		$scope.street = null;
		$scope.streetRegion = null;
		$scope.streetToDelete = null;
		$scope.customDeliveryStreet = null;
	}

	var lastOperation = 'Last operation: ';
}]);