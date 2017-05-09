'use strict';

function foglioDiLavoroController($scope, $log,$event) {
 
  this.nuovoIO=function(){

  }
  this.isRule=function(){
    return true;
  }
  this.verificaCorrettezza=function(){

  }
  this.esportaRegola=function(){

  }
  this.generaXML=function(){

  }
  
}
    


angular.
  module('myApp', []).
  service('foglioDiLavoro', {
    templateUrl: 'core/foglio-di-lavoro/foglio-di-lavoro.component.html',
    controller: foglioDiLavoroController
  });