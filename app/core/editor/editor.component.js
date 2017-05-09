'use strict';

//  NON PU0' ESSERE SCRITTA CON LA LETTERA MAIUSCOLA
//  MA E' UNA "CLASSE"
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
