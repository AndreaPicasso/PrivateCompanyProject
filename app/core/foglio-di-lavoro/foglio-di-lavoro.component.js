'use strict';

function foglioDiLavoroController($scope, $log,$event) {
 
  
  
  
  
 
  this.onDrop=function($event){
    var x=$event.pageX;
    var y=$event.pageY;
    $log.log(x);
    $log.log(y);


  }
}
    


angular.
  module('myApp', []).
  component('foglioDiLavoro', {
    templateUrl: 'core/foglio-di-lavoro/foglio-di-lavoro.component.html',
    controller: foglioDiLavoroController
  });