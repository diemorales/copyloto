
//INIT DB
var db;

angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, $rootScope) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    //open DB
    $rootScope.db = window.sqlitePlugin.openDatabase( {name: "copdata.db", createFromLocation: 1} );
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })


  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })


  .state('app.infracciones', {
      url: '/infracciones',
      views: {
        'menuContent': {
          templateUrl: 'templates/infracciones.html',
          controller: 'InfraCtrl'
        }
      }
    })

  .state('app.infraccion', {
      url: '/infracciones/:pInfraccion',
      views: {
        'menuContent': {
          templateUrl: 'templates/infraccion.html',
          controller: 'InfraDetCtrl'
        }
      }
    })

  .state('app.temasviales', {
      url: '/temasviales',
      views: {
        'menuContent': {
          templateUrl: 'templates/temas-viales.html',
          controller: 'TemViaCtrl'
        }
      }
    })

  .state('app.articulos', {
    url: "/temasviales/articulos/:pTemavial",
    views: {
        'menuContent':{
          templateUrl: "templates/articulos.html",
          controller: 'TVArtsCtrl'
        }
      }
  })

  .state('app.articulo', {
    url: "/temasviales/articulo/:pArticulo",
    views: {
        'menuContent':{
          templateUrl: "templates/articulo.html",
          controller: 'TVArtCtrl'
        }
      }
  })

  .state('app.reglamentos', {
    url: '/reglamentos',
    views: {
      'menuContent': {
        templateUrl: 'templates/reglamentos.html',
        controller: 'ReglCtrl'
      }
    }
  })    

  .state('app.tipscat', {
    url: '/tips',
    views: {
      'menuContent': {
        templateUrl: 'templates/tips-categoria.html',
        controller: 'TipsCatCtrl'
      }
    }
  }) 

  .state('app.tips', {
    url: '/tips/:pTipsId',
    views: {
      'menuContent': {
        templateUrl: 'templates/tips.html',
        controller: 'TipsCtrl'
      }
    }
  }) 

  .state('app.map', {
    url: '/map',
    views: {
      'menuContent': {
        templateUrl: 'templates/mapa.html',
        controller: 'MapCtrl'
      }
    }
  })

  .state('app.denuncia', {
    url: '/denuncia',
    views: {
      'menuContent': {
        templateUrl: 'templates/denuncia.html',
        controller: 'DenCtrl'
      }
    }
  }) 

  .state('app.nosotros', {
    url: '/nosotros',
    views: {
      'menuContent': {
        templateUrl: 'templates/nosotros.html',
        controller: 'NosCtrl'
      }
    }
  }) 
  .state('app.utiles', {
    url: '/informaciones-utiles',
    views: {
      'menuContent': {
        templateUrl: 'templates/utiles.html',
        controller: 'InfoCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
