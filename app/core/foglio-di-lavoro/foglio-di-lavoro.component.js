app.directive('foglioDiLavoro', function () {
    return {
        restrict:'E',
    templateUrl: 'core/foglio-di-lavoro/foglio-di-lavoro.component.html',
    controller: ['$scope', "$log" /*,"FoglioDiLavoroService"*/, FoglioDiLavoroController]
    };
});
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


    


