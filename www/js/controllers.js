angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $cordovaSocialSharing, $timeout) {

    //recomendar
    var URL_SHARE = "www.copyloto.com.py";
    var TXT_SHARE = "COPYLOTO es tu amigo que te guía en el tránsito víal :) Descargalo ya!";
    var IMG_SHARE = "www/img/logo-prueba.png";
    $scope.shareAnywhere = function() {
        $cordovaSocialSharing.share(TXT_SHARE, null, IMG_SHARE, URL_SHARE);
    }
})
//HOME
.controller('HomeCtrl', function($scope) {
  

})
//INFRACIONES
.controller('InfraCtrl', function($scope, $cordovaSQLite, $rootScope) {
  
      $scope.infracciones = [];
      var query = "SELECT * FROM inf_detalles";

      $rootScope.db.transaction(function(tx) {
          tx.executeSql(query, [], function(tx, res) {

            for(var i = 0; i < res.rows.length; i++){

                $scope.infracciones.push({
                  nombre: res.rows.item(i).nombre,
                  id: res.rows.item(i).id,
                  inciso: res.rows.item(i).inciso,
                  articulo: res.rows.item(i).articulo
                });
                $scope.$apply();
            }
          });
        }, function(error) {
          // OK to close here:
          console.log('transaction error: ' + error.message);
          db.close();
        }, function() {
          // OK to close here:
          console.log('transaction ok');
      });  
})
//INFRACIONES
.controller('InfraDetCtrl', function($scope, $stateParams, $cordovaSQLite, $rootScope) {
  
      var parId = $stateParams.pInfraccion;
      $scope.articulo='';
      $scope.nombre='';
      $scope.descripcion='';
      $scope.inciso='';
      $scope.sancion_desc='';
      $scope.sancion_mul='';
      $scope.sancion_gs='';

      var query = "SELECT * FROM inf_detalles WHERE id = ?";

      $rootScope.db.transaction(function(tx) {
          tx.executeSql(query, [parId], function(tx, res) {

            if(res.rows.length > 0) {

                  $scope.articulo=res.rows.item(0).articulo;
                  $scope.nombre=res.rows.item(0).nombre;
                  $scope.descripcion=res.rows.item(0).descripcion;
                  $scope.inciso=res.rows.item(0).inciso;
                  $scope.sancion_desc=res.rows.item(0).sancion_desc;
                  $scope.sancion_mul=res.rows.item(0).sancion_mul;
                  $scope.sancion_gs=res.rows.item(0).sancion_gs;
                  $scope.$apply();
                } else {
                  //console.log("no hay resultados");
              }            
          });
        }, function(error) {
          console.log('transaction error: ' + error.message);
          db.close();
        }, function() {
          //console.log('transaction ok');
      });
})
//TEMAS VIALES
.controller('TemViaCtrl', function($scope, $cordovaSQLite, $rootScope) {

      $scope.items = [];
      var query = "SELECT * FROM temas_viales";

      $rootScope.db.transaction(function(tx) {
          tx.executeSql(query, [], function(tx, res) {

            for(var i = 0; i < res.rows.length; i++){

                $scope.items.push({
                  title: res.rows.item(i).nombre,
                  id: res.rows.item(i).id
                });
                $scope.$apply();
            }            
          });
        }, function(error) {
          // OK to close here:
          console.log('transaction error: ' + error.message);
          db.close();
        }, function() {
          //console.log('transaction ok');
      });
})
//TEMAS VIALES
.controller('TVArtsCtrl', function($scope, $stateParams, $cordovaSQLite, $rootScope) {
  
      var parId = $stateParams.pTemavial;
      $scope.articulos = [];
      var query = "SELECT * FROM tv_articulos WHERE tv_id = ?";

      $rootScope.db.transaction(function(tx) {
          tx.executeSql(query, [parId], function(tx, res) {
            for(var i = 0; i < res.rows.length; i++){

                $scope.articulos.push({
                  nombre: res.rows.item(i).nombre,
                  articulo: res.rows.item(i).articulo
                });
                $scope.$apply();
            }            
          });
        }, function(error) {
          // OK to close here:
          console.log('transaction error: ' + error.message);
          db.close();
        }, function() {
          //console.log('transaction ok');
      });
})
//TEMAS VIALES
.controller('TVArtCtrl', function($scope, $stateParams, $cordovaSQLite, $rootScope) {
  
      var parArt = $stateParams.pArticulo;
      $scope.articulo = '';
      $scope.nombre = '';
      $scope.descripcion = '';
      var query = "SELECT * FROM tv_articulos WHERE articulo = ?";

      $rootScope.db.transaction(function(tx) {
          tx.executeSql(query, [parArt], function(tx, res) {

            if(res.rows.length > 0) {

                  $scope.articulo=res.rows.item(0).articulo;
                  $scope.nombre=res.rows.item(0).nombre;
                  $scope.descripcion=res.rows.item(0).descripcion;
                  $scope.$apply();
                } else {
                  //console.log("no hay resultados");
            }            
          });
        }, function(error) {
          // OK to close here:
          console.log('transaction error: ' + error.message);
          db.close();
        }, function() {
          //console.log('transaction ok');
      });
})
//REGLAMENTOS
.controller('ReglCtrl', function($scope, $window) {
  
      $scope.OpenLink = function(link) {
        window.open( link, '_system');
      };
})
//TIPS
.controller('TipsCatCtrl', function($scope) {
  

})
//TIPS
.controller('TipsCtrl', function($scope, $stateParams) {  
  var par = $stateParams.pTipsId;
  $scope.myActiveSlide = 0;
  var automovil = [
    {titulo:' Respete las normas de tránsito, mantenga distancia de seguridad y velocidad adecuada.', age:25, desc:''},
    {titulo:' No transporte más pasajeros de la capacidad del vehículo.', desc:''},
    {titulo:' Lleve encendida las luces bajas siempre.', desc:''},
    {titulo:' Si ingirió alcohol no conduzca, por más mínima que haya sido la cantidad.', desc:''},
    {titulo:' Todos los ocupantes del vehículo deben llevar puesto el cinturón de seguridad, los niños siempre viajan atrás. Recuerde que los niños menores a 5 años deben usar la silla especial.', desc:''},
    {titulo:' Contar con la documentación obligatoria para desplazarse con su vehículo, licencia de conducir, cedula de identidad, cedula verde, seguro obligatorio contra accidentes de tránsito e inspección técnica vehicular aprobada, habilitación municipal.', desc:''},
    {titulo:' Los automóviles deben contar con juego de balizas, extintor de incendio debidamente cargado, señaleros, luces trasera y luces de freno.', desc:''},
    {titulo:' Para desplazarse el vehículo deben contar obligatoriamente con las chapas en ambos lados.', desc:''}
  ];
  var peaton = [
    {titulo:' Caminar por la vereda y no por la calle, además de jamás cruzar en el medio de una cuadra, sino hacerlo en las esquinas.', age:25, desc:''},
    {titulo:' Recuerda que no debes caminar ni atravesar las autopistas.', desc:''},
    {titulo:' Circular siempre por el lado izquierdo de la calzada de tal manera que al caminar siempre vea a los coches venir de frente.', desc:''},
    {titulo:' Al llegar al paso de peatones nos detendremos en la vereda/acera, no en la calzada, mostraremos la intención de cruzar mirando a los coches y a sus conductores.', desc:''},
    {titulo:' Evite el uso de elementos distractores como celulares, tabletas, periódicos y otros mientras se movilice por las calles con mucho tránsito.', desc:''}
  ];
  var moto = [
    {titulo:' No conduzca cuando las condiciones climáticas sean desfavorables, pues los riesgos de accidentes se verán aumentadas.', age:25, desc:''},
    {titulo:' Evite ir muy detrás de un camión u otro vehículo.', desc:''},
    {titulo:' No exceda los límites de velocidad.', desc:''},
    {titulo:' El uso del casco y del chaleco reflectivo es obligatorio.', desc:''},
    {titulo:' No circule por las aceras y paseos públicos destinados a los peatones.', desc:''},
    {titulo:' No transporte en la motocicleta menores de 12 años.', desc:''}
  ];
  var otros = [
    {titulo:' En caso de accidente deberá de detenerse inmediatamente en el lugar del hecho, si existiesen  víctimas, ejercer y buscar el inmediato socorro de las personas lesionadas, señalizar adecuadamente el lugar, para evitar riesgos a terceros. No retirar los rodados involucrados y suministrar a la otra parte y a la autoridad interviniente, sus datos personales y los del vehículo.', desc:''},
    {titulo:' La patrulla caminera tienen autoridad de aplicación en rutas nacionales e internacionales y caminos vecinales, en cambio la jurisdicción de la policía caminera se limita sólo a la zona urbana del distrito en cuestión.', age:25, desc:''},
    {titulo:' Los pagos de las multas deberán de realizarse dentro de los 5 días hábiles desde su imposición.', desc:''},
    {titulo:' Las multas pueden ser abonadas al instante dependiendo de la clasificación de las infracciones si son leves o directamente dentro de los 5 días hábiles deberán acudir a las regionales o jefaturas de la patrulla caminera o municipalidades de acuerdo a las áreas de aplicación y competencias jurídicas.', desc:''},
    {titulo:' En caso de accidente de tránsito deberá someterse a las  pruebas expresamente autorizadas, para determinar su estado de intoxicación alcohólica o  por sustancias estupefacientes o sicotrópicas en el momento del hecho.', desc:''}
  ];

  switch (par) {
      case 'automovil':
          $scope.items=automovil;
          break;    
      case 'peaton':
          $scope.items=peaton;
          break; 
      case 'moto':
          $scope.items=moto;
          break; 
      default: 
          $scope.items=otros;
  }  
})
//MAPA
.controller('MapCtrl', function($scope, $compile) {

  var peajes = [
    {titulo: 'PUENTE REMANSO, Asu-Chaco', direccion: 'Ruta Transchaco Ruta 9', lat: '-25.187437', lon: '-57.542611'},
    {titulo: 'Ypacarai, Asu-CDE', direccion: 'Mcal. J. Félix Estigarribia', lat: '-25.393201', lon: '-57.2790994'},
    {titulo: 'VILLA FLORIDA, Enc-Asu', direccion: 'Mcal. Francisco Solano Lopez, Ruta 1', lat: '-26.406032', lon: '-57.129585'},
    {titulo: 'CERRITO, Chaco-Asu', direccion: 'Carlos Antonio Lopez Ruta 9', lat: '-24.944861', lon: '-57.553107'},
    {titulo: 'EMBOSCADA, Lim-SanEst', direccion: 'General Aquino Ruta 3', lat: '-25.113749', lon: '-57.429791'},
    {titulo: 'ACCESO SUR, Asu-Gua', direccion: 'Acceso Sur', lat: '-25.507309', lon: '-57.433358'},
    {titulo: 'CNEL. OVIEDO, CDE-Asu', direccion: 'Mcal. Estigarribia Ruta 2', lat: '-25.474837', lon: '-56.535000'}
  ];
  var destacamentos = [
    {titulo: 'Jefatura Zona Central', direccion: 'Mcal. Estigarribia Ruta 2, San Lorenzo', lat: '-25.339638', lon: '-57.521067'},
    {titulo: 'Destacamento Hernandarias', direccion: 'Supercarretera', lat: '-25.322805', lon: '-54.664540'},
    {titulo: 'Jefatura Nº 8 Zona CDE', direccion: 'Av. Mcal. López c/ Gaspar Rodríguez de Francia', lat: '-25.507502 ', lon: '-54.638513'},
    {titulo: 'Jefatura Nº 1 Zona Carapeguá', direccion: 'Mcal. López Ruta Nº 1 Km. 84', lat: '-25.767418 ', lon: '-57.238773'},
    {titulo: 'Jefatura Nº 7 Zona Cnel. Oviedo', direccion: 'Dr. José Gaspar Rodríguez de Francia', lat: '-25.466452  ', lon: '-56.448022'}
  ];

  var tacpy = [
    {titulo: 'Casa Central', direccion: '25 de Mayo c/ Brasil, Asunción', lat: '-25.288585', lon: '-57.624762'},
    {titulo: 'Sucursal Villa Aurelia', direccion: 'Nicolás Bliloff 7070 c/ Victoriano Bueno', lat: '-25.30556', lon: '-57.560303'},
    {titulo: 'Base Villa Florida', direccion: 'Ruta 1 Mcal. López Km. 156, Parador Tebicuary', lat: '-26.405449', lon: '-57.129277'},
    {titulo: 'Delegación Cnel. Oviedo', direccion: 'Ruta 2 Mcal. Estigarribia c/ Itapúa', lat: '-25.466156', lon: '-56.449547'},
    {titulo: 'Delegación CDE', direccion: 'Avda. San Blás Km. 1,5', lat: '-25.509553  ', lon: '-54.618596'},
  {titulo: 'Delegación Encarnación', direccion: 'Gral. Artigas c/ Villarrica', lat: '-27.329847', lon: '-55.869825'},
  {titulo: 'Delegación San Estanislao (Santaní)', direccion: 'Avda. Rosita Melo c/ Pedro Juan Caballero', lat: '-24.671184', lon: '-56.445786'},
  {titulo: 'Delegación Pozo Colorado', direccion: 'Ruta Transchaco Km. 270', lat: '-23.493959', lon: '-58.793669'},
  {titulo: 'Delegación Yby Yaú', direccion: 'Avda. San Blás Km. 1,5', lat: '-22.964', lon: '-56.541208'},
  {titulo: 'Base Juan E. OLeary', direccion: 'Ruta 7 Km. 248', lat: '-25.422395', lon: '-55.377544'}
  ];

   $scope.initialize = function() {
        //console.log('init map');
        var myLatlng = new google.maps.LatLng(-25.3421689,-57.5046647);
        var mapOptions = {
          center: myLatlng,
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        $scope.map = map;
        $scope.markers = [];
    };  

    //marker adicionales peajes
    $scope.fPeajes = function () {
      deleteAllMarkers();
      $scope.markers = [];
      
      var infoWindow = new google.maps.InfoWindow();
      //Add markers
      var createMarker = function (info){
          var marker = new google.maps.Marker({
              position: new google.maps.LatLng(info.lat, info.lon),
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              title: info.titulo
          });
          marker.content = '<div class="infoWindowContent">' + info.direccion + '</div>';
          google.maps.event.addListener(marker, 'click', function(){
              infoWindow.setContent('<h3>' + marker.title + '</h3>' + marker.content);
              infoWindow.open($scope.map, marker);
          });
          $scope.markers.push(marker);
      };      
        for (i = 0; i < peajes.length; i++){
            createMarker(peajes[i]);
        }        
    };
    
    //marker adicionales destacamentos
     $scope.fDestacamentos = function () {
        deleteAllMarkers();
          //console.log('markers borrados');
        $scope.markers = [];
        var infoWindow = new google.maps.InfoWindow();
        //Add markers
        var createMarker = function (info){
          var marker = new google.maps.Marker({
              position: new google.maps.LatLng(info.lat, info.lon),
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              title: info.titulo
          });
          marker.content = '<div class="infoWindowContent">' + info.direccion + '</div>';
          google.maps.event.addListener(marker, 'click', function(){
              infoWindow.setContent('<h3>' + marker.title + '</h3>' + marker.content);
              infoWindow.open($scope.map, marker);
          });
          $scope.markers.push(marker);
      };      
        for (i = 0; i < destacamentos.length; i++){
            createMarker(destacamentos[i]);
        }            
     };   


    //marker adicionales destacamentos
     $scope.fTacpy = function () {
        deleteAllMarkers();
          //console.log('markers borrados');
        $scope.markers = [];
        var infoWindow = new google.maps.InfoWindow();
        //Add markers
        var createMarker = function (info){
          var marker = new google.maps.Marker({
              position: new google.maps.LatLng(info.lat, info.lon),
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              title: info.titulo
          });
          marker.content = '<div class="infoWindowContent">' + info.direccion + '</div>';
          google.maps.event.addListener(marker, 'click', function(){
              infoWindow.setContent('<h3>' + marker.title + '</h3>' + marker.content);
              infoWindow.open($scope.map, marker);
          });
          $scope.markers.push(marker);
      };      
        for (i = 0; i < tacpy.length; i++){
            createMarker(tacpy[i]);
        }            
     };        

    //Delete all Markers
    var deleteAllMarkers = function(){
            if($scope.markers.length == 0){
                //console.log('no ha markers')
                return;
            }
            for (var i = 0; i < $scope.markers.length; i++) {
                //Remove the marker from Map                  
                $scope.markers[i].setMap(null);
            }
            //Remove the marker from array.
            $scope.markers.length = 0;
            $scope.markerId = 0;
      };     
})
//DENUNCIAS
.controller('DenCtrl', function($scope) {
  
  
})
//NOSOTROS
.controller('NosCtrl', function($scope) {
  
  
})
//INFORMACIONES UTILES
.controller('InfoCtrl', function($scope) {
  $scope.llamar = function (ptel) {
    window.location.href = 'tel:'+ ptel;
  }
    $scope.utiles = [
    {nombre: "Patrulla Caminera", telefono: "+59521582689", direccion: "Ruta No. 2 Mcal. Estigarribia c/ San José, km. 14", ciudad:"San Lorenzo"},
    {nombre: "MOPC", telefono: "+595214149000", direccion: "Oliva y Alberdi Nº 411, C.P. Nº 1221", ciudad:"Asunción"},
    {nombre: "Emergencia Policial", telefono: "+59521911", direccion: "--", ciudad: "--"},
    {nombre: "Emergencia Médicas", telefono: "+59521204800", direccion: "Avenida Gral. M. Santos", ciudad: "Asunción"},
    {nombre: "S.O.S. Personas Desamparadas", telefono: "+59521440997", direccion: "--", ciudad:"--"},
    {nombre: "S.O.S. Niños & Mujer", telefono: "+59521140", direccion: "--", ciudad:"--"},
    {nombre: "Touring y Automovil Club", telefono: "+59521233160", direccion: "25 de Mayo 1086 Esq. Brasil", ciudad: "Asunción"},
    {nombre: "Escuela de Conducción TACPY", telefono: "+59521210550", direccion: "Choferes del Chaco", ciudad: "Asunción"},
    {nombre: "Auxilio Tigo TACPY", telefono: "*822", direccion: "--", ciudad: "Paraguay"},
    {nombre: "Auxilio Personal TACPY", telefono: "*823", direccion: "--", ciudad: "Paraguay"},
    {nombre: "Cruz Roja", telefono: "+59521211387", direccion: "Brasil 216 c/ José Berges", ciudad: "Asunción"},
    {nombre: "Aeropuerto Silvio Pettirossi", telefono: "+59521645600", direccion: "Aviadores del Chaco", ciudad: "Luque"},
    {nombre: "Fiscalía", telefono: "+595214155000", direccion: "--", ciudad: "--"},
    {nombre: "Terminal de Ómnibus", telefono: "+59521551740", direccion: "Rca. Argentina esq. Fdo. de la Mora", ciudad: "Asunción"},
  ];  
})
// fin
;
