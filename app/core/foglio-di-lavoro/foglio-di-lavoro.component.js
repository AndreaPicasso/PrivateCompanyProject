app.directive('foglioDiLavoro', function () {
    return {
        restrict:'E',
    templateUrl: 'core/foglio-di-lavoro/foglio-di-lavoro.component.html',
    controller: ['$scope', "$log","ListaOperatoriService" ,"FoglioDiLavoroService", FoglioDiLavoroController]
    };
});
function FoglioDiLavoroController($scope, $log, $event, FoglioDiLavoroService) {
 

    this.aggiungiOperatore = function($positionX, $positionY, $inPorts, $outPorts, $inPortsTypes,
 $outPortsTypes, $testoOperatore){

 }
  
  
 
  $scope.onClickFoglio =function(){
        FoglioDiLavoroService.onClickFoglio($event);
  } 


    $scope.otherMenuOptions = [
        ['Ellimina', function ($event) {
            console.log("Ellimina");
        }],
        null,
        ['Setta Parametri', function ($event) {
            console.log("Ellimina");
        }]
    ];
    


}


    


