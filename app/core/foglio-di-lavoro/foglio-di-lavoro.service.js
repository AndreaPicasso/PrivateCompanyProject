'use strict';

angular.module('myApp').service('FoglioDiLavoroService', function(){
    this.paper='';
    this.grafo='';

    this.creaFoglioDiLavoroRegola = function(idElement, validateConnectionFnc){
        this.grafo = new joint.dia.Graph;

        var element = document.getElementById(idElement);
        this.paper = new joint.dia.Paper({  
          el: element,
          width: element.clientWidth,
          height: element.clientHeight,
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
          validateEmbedding: function(childView, parentView) {
              return parentView.model instanceof joint.shapes.devs.Coupled;
          },
          /*
          validateConnection: function(sourceView, sourceMagnet, targetView, targetMagnet) {
              return sourceMagnet != targetMagnet;
          }
          */
          validateConnection: validateConnectionFnc,
        });
    };


    
/**
 * Input: posizione [x,y] rispetto foglio di lavoro
 * inPorts: array di id delle porte di ingresso
 * outPorts: array di id porte di uscita
 * 
 * TODO: cambiare paramentri, viene passato il json e io ricorstrusco l'operatore
 * 
 */
this.onDrop = function($positionX, $positionY, $inPorts, $outPorts, $inPortsTypes,
 $outPortsTypes, $testoOperatore){
    var operatore = new joint.shapes.devs.Atomic({
        position: {
            x: $positionX,
            y: $positionY
        },
        inPorts: $inPorts,
        outPorts: $outPorts,
        attrs:{
            '.body': {
                'rx': 6,
                'ry': 6
            },
        /*TIPO NELL'OPERATORE:
            'tipiInput': $inPortsTypes,
            'tipiOutput': $outPortsTypes
            */
        }
      });

/*
    MODO CORRETTO DI METTERE IL TIPO:
        CREO UN NUOVO ATTRIBUTO PER OGNI PORTA CHIAMATO TIPO
        L'attributo si troverà in
        operatore.attributes.ports.items[j].tipo = 'int';
        j: # porta
*/

    for(var j = 0; j<operatore.attributes.ports.items.length; j++){
        var ports, types;
        if(operatore.attributes.ports.items[j].group == 'out'){
            types = $outPortsTypes;
            ports = $outPorts
        }
        else{
            types = $inPortsTypes;
            ports = $inPorts;
        }
        for(var i = 0; i<ports.length; i++){
            if(ports[i]==operatore.attributes.ports.items[j].id)
                operatore.attributes.ports.items[j].tipo = types[i];
        }
    }


    $testoOperatore = joint.util.breakText($testoOperatore, { width: 53 });
    operatore.attr('.label/text', $testoOperatore);
    if(this.grafo != ''){
        this.grafo.addCell(operatore);
        console.log("operatore creato");
      }
    if(this.operatoreComplesso != ''){
        this.operatoreComplesso.embed(operatore);
    }
    return operatore;
};    


  this.isRule=function(){
    return true;
  };


  this.verificaCorrettezza=function(){
        return ValidityCheckerService.verificaCorrettezza(this.grafo);
  };

  this.esportaRegola=function(){

  };

  this.generaXML=function(){

  };





/*  ....ALTRO...  */ 
this.log = function(){
    console.log("Grafo:");
    console.log(this.grafo);
    console.log("FoglioLavoro: ")
    console.log(this.paper);
    var cells = this.grafo.getCells();
    console.log("cells:");
    console.log(cells);
    console.log("Ports of 'Operatore': ")
    console.log(cells[2].getPorts());
}

});




