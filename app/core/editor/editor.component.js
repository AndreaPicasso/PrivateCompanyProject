'use strict';

//  NON PU0' ESSERE SCRITTA CON LA LETTERA MAIUSCOLA
//  MA E' UNA "CLASSE"
function EditorController($scope, $log, ListaOperatoriService) {
     
     ListaOperatoriService.loadJSONOperatori();
     $scope.items = ["1","2","3"];


     this.nuovaRegola = function(){
        $log.log("nuova regola");
     }

     this.nuovoOpCompl = function(){

     }

     this.nuovaPortaOpCompl = function(){
       
     }

     this.chiudiFoglioDiLavoro = function(){
       
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
