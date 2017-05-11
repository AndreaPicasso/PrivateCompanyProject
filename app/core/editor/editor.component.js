'use strict';

//  NON PU0' ESSERE SCRITTA CON LA LETTERA MAIUSCOLA
//  MA E' UNA "CLASSE"
function EditorController($scope, $log,$window, ListaOperatoriService, FoglioDiLavoroService) {
     
    this.operatori = [];

     this.nuovaRegola = function(){
        this.operatori = ListaOperatoriService.loadJSONOperatori();
        $log.log(this.operatori);
        


     }

     this.nuovoOpComplesso = function(){
        this.operatori = ListaOperatoriService.loadJSONOperatori();

     }

     this.nuovaPortaOpCompl = function(){
        FoglioDiLavoroService.nuovaPortaOpCompl();
     }

     this.chiudiFoglioDiLavoro = function(){
        this.operatori = [];
     }

     this.verificaCorrettezza = function(){
        $windoe.allert(FoglioDiLavoroService.verificaCorrettezza());
       
     }

     this.esportaRegola = function(){
          FoglioDiLavoroService.esportaRegola();
     }

}
    
angular.
  module('myApp', []).
  component('editor', {
    template: '<foglio-di-lavoro></foglio-di-lavoro>',
    controller: ['$scope', "$log","$window", "ListaOperatoriService","FoglioDiLavoroService", EditorController]
  });
