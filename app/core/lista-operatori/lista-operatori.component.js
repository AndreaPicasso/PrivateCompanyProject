'use strict';

function listaOperatori($scope, $log) {
    
    this.nuovaRegola = function(){
      $log.log("nuova regola");
    }

    this.nuovoOpCompl = function(){

    }

    this.nuovaPortaOpCompl = function(){

    }

    this.esportaRegola = function(){

    }

    this.verificaCorrettezza = function(){

    }

    this.chiudiFoglioDiLavoro = function(){

    }  
    
      
}
    


angular.
  module('myApp', []).
  component('listaOperatori', {
    templateUrl: 'core/lista-operatori/lista-operatori.component.html',
    controller: listaOperatori
  });
