app.directive('listaOperatori', function () {
    return {
        restrict:'E',
        templateUrl: 'core/lista-operatori/lista-operatori.component.html',
    controller: ListaOperatoriController
    };
});


function ListaOperatoriController($scope, ListaOperatoriService) {

  // PER QUALCHE MOTIVO ASTRALE COSì NON FUNZIONA  
  //$scope.onClickLista=ListaOperatoriService.onClickLista();

  $scope.onClickLista = function($event, operatore, tipo){
      $scope.descrizione = ListaOperatoriService.onClickLista($event, operatore, tipo);
  }
}
    


    


