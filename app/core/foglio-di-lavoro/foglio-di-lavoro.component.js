'use strict';

function FoglioDiLavoroController($scope, $log /*, FoglioDiLavoroService*/) {
 

    this.aggiungiOperatore = function($positionX, $positionY, $inPorts, $outPorts, $inPortsTypes,
 $outPortsTypes, $testoOperatore){

 }
  
  
 
  this.onDrop=function(e){
    var x=e.pageX;
    var y=e.pageY;
    
    //this.aggiungiOperatore(x,y,..);
  }


}


    


angular.
  module('myApp', []).
  component('foglioDiLavoro', {
    //templateUrl: 'core/foglio-di-lavoro/foglio-di-lavoro.component.html',
    template: '<b>MIAO</b>',
    controller: ['$scope', "$log" /*,"FoglioDiLavoroService"*/, FoglioDiLavoroController]
  });