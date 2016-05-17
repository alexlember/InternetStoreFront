/**
 * Created by alembers on 5/11/16.
 */

internetStoreModule.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/main");
    $stateProvider

        .state('main', {
            url: "/main",
            views:{
                'main':{
                    templateUrl: "./components/main/main.html",
                    controller: 'mainController'
                }
            }
        })
    

    //$locationProvider.html5Mode(true);
}]);