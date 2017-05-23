app.directive('listaOperatori', function () {
    return {
        restrict:'E',
        templateUrl: 'core/lista-operatori/lista-operatori.component.html',
    controller: ListaOperatoriController
    };
});


function ListaOperatoriController($scope, ListaOperatoriService) {

  


  $scope.showDescription = function(operatore){
      $scope.descrizione = operatore.descrizione;
  }

  $scope.onClickLista = function($event, operatore, tipo){
    ListaOperatoriService.onClickLista($event, operatore, tipo);
  }
}
    


    


