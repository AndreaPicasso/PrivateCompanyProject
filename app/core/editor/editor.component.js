(function(angular) {
'use strict';


function EditorController($scope, $log, ListaOperatoriService) {
     
    this.operatori = [];

     this.nuovaRegola = function(){
        this.operatori = ListaOperatoriService.loadJSONOperatori();
        $log.log(this.operatori);


     }

     this.nuovoOpComplesso = function(){
        this.operatori = ListaOperatoriService.loadJSONOperatori();

     }

     this.nuovaPortaOpCompl = function(){
       
     }

     this.chiudiFoglioDiLavoro = function(){
        this.operatori = [];
     }

     this.verificaCorrettezza = function(){
       
     }

     this.esportaRegola = function(){
       
     }

}
    
angular.
  module('myApp', []).
  component('editor', {
    templateUrl: 'core/editor/editor.component.html',
    controller: ['$scope', "$log", "ListaOperatoriService", EditorController]
  });

})(window.angular);