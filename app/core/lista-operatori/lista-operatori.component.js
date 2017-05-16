app.directive('listaOperatori', function () {
    return {
        restrict:'E',
        templateUrl: 'core/lista-operatori/lista-operatori.component.html',
    controller: ListaOperatoriController
    };
});


function ListaOperatoriController($scope, ListaOperatoriService) {

  $scope.logOperatori = function(){
  }


}
    


