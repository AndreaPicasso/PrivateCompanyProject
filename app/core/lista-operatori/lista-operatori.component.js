'use strict';
'use strict';


function ListaOperatoriController($scope, ListaOperatoriService) {
  console.log("Lista Operatori ok");

  this.operatori = [];
  
}
    


angular.
  module('myApp', []).
  component('listaOperatori', {
    templateUrl: 'core/lista-operatori/lista-operatori.component.html',
    controller: ListaOperatoriController

  });


