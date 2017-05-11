(function(angular) {
'use strict';


function EditorController($scope, $log,$window, ListaOperatoriService, FoglioDiLavoroService) {

     
    this.operatori = [];

     this.nuovaRegola = function(){
        this.operatori = ListaOperatoriService.loadJSONOperatori();
        FoglioDiLavoroService.creaFoglioDiLavoroRegola('fogliodilavoro', function(){return true});
         FoglioDiLavoroService.onDrop(10,10,['in1', 'in2'],['out1'], ['int','int'],['int'], 'Somma');
        


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
        //$window.allert(FoglioDiLavoroService.verificaCorrettezza());
       
     }

     this.esportaRegola = function(){
          FoglioDiLavoroService.esportaRegola();
     }

}
    
angular.
  module('myApp', []).
  component('editor', {
    templateUrl: 'core/editor/editor.component.html',
    controller: ['$scope', "$log","$window", "ListaOperatoriService","FoglioDiLavoroService", EditorController]
  });

})(window.angular);