'use strict';


function EditorController($scope, $log,$window, ListaOperatoriService, FoglioDiLavoroService) {

     
    this.operatori = [];

     this.nuovaRegola = function(){
        this.operatori = ListaOperatoriService.loadJSONOperatori();
        FoglioDiLavoroService.creaFoglioDiLavoroRegola('fogliodilavoro', function(){return true});
        /* NON SAREBBE ASSOLUTAMENTE DA FARE QUI: */
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


     /* TODO: NON VA QUI, TOGLIERE E METTERE IN FOGLIO DI LAVORO */
    this.onDropComplete=function(data,evt){
            var index = $scope.droppedObjects2.indexOf(data);
            if (index == -1) {
                $scope.droppedObjects2.push(data);
            }
        }

}
    
angular.
  module('myApp', []).
  component('editor', {
    templateUrl: 'core/editor/editor.component.html',
    controller: ['$scope', "$log","$window", "ListaOperatoriService","FoglioDiLavoroService", EditorController]
  });
