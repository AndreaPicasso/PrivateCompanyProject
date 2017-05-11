'use strict';


    


angular.
  module('myApp', []).
  service('FoglioDiLavoroService', function(){
    var grafo;
    var paper;
  this.creaFoglioDiLavoro=function(){
        this.grafo = new joint.dia.Graph;

        
        this.paper = new joint.dia.Paper({  
              el: document.getElementById($idElement),
              width: $width,
              height: $height,
              gridSize: 20,
              drawGrid: 'fixedDot',
              model: this.grafo,
              snapLinks: true,
              linkPinning: false,
              embeddingMode: true,
              highlighting: {
                  'default': {
                      name: 'stroke',
                      options: {
                          padding: 6
                      }
                  },
                  'embedding': {
                      name: 'addClass',
                      options: {
                          className: 'highlighted-parent'
                      }
                  }
              },
              /*validateEmbedding: function(childView, parentView) {
                  return parentView.model instanceof joint.shapes.devs.Coupled;
              },
              /*
              validateConnection: function(sourceView, sourceMagnet, targetView, targetMagnet) {
                  return sourceMagnet != targetMagnet;
              }
              */
              validateConnection: function(sourceView, sourceMagnet, targetView, targetMagnet) {
                var sourcePort= sourceView.getPort(sourceMagnet.idPorta);
                  var targetPort= targetView.getPort(targetMagnet.idPorta);
                  //verifico corrispondano i tipi e ritorno false se non corrispondo torno false

                  return sourceMagnet != targetMagnet;
              }
            });
        
  }
  this.nuovoIO=function(){
          
  }
  this.isRule=function(){
    return true;
  }
  this.verificaCorrettezza=function(){
        return ValidityCheckerService.verificaCorrettezza(this.grafo);
  }
  this.esportaRegola=function(){

  }
  this.generaXML=function(){

  }
  

});