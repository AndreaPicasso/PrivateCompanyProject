'use strict';
'use strict';

function editorController($scope, $log) {
    
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
  component('editor', {
    templateUrl: 'core/editor/editor.component.html',
    controller: editorController
  });
