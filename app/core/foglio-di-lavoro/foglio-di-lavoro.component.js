'use strict';

function foglioDiLavoroController($scope, $log,$FoglioDiLavoroService) {
 
    
  
  
 
  this.onDrop=function(e){
    var x=e.pageX;
    var y=e.pageY;
    $log.log(x);
    $log.log(y);


  }
}
    


angular.
  module('myApp', []).
  component('foglioDiLavoro', {
    templateUrl: 'core/foglio-di-lavoro/foglio-di-lavoro.component.html',
    controller: ['$scope', "$log","$foglioDiLavoroService", foglioDiLavoroController]
  });