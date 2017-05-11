'use strict';

function foglioDiLavoroController($scope, $log,$FoglioDiLavoroService) {
 
    this.aggiungiOperatore = function($positionX, $positionY, $inPorts, $outPorts, $inPortsTypes,
 $outPortsTypes, $testoOperatore){
    var operatore = new joint.shapes.devs.Atomic({
        position: {
            x: $positionX,
            y: $positionY
        },
        inPorts: $inPorts,
        outPorts: $outPorts,
        attrs:{
            '.body': {
                'rx': 6,
                'ry': 6
            },
        /*TIPO NELL'OPERATORE:
            'tipiInput': $inPortsTypes,
            'tipiOutput': $outPortsTypes
            */
        }
      });
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
    templateUrl: 'core/foglio-di-lavoro/foglio-di-lavoro.component.html',
    controller: ['$scope', "$log","$foglioDiLavoroService", foglioDiLavoroController]
  });