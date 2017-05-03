'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.module('myApp').service('WrapperJoint', function(){
    this.foglioDiLavoro='';
    this.grafo='';
    this.operatoreComplesso=''; //Variabile settata se si tratta di un op complesso


   //CLASSE DERIVATA this.prova = joint.shapes.devs.Model.extend({tipo: 'int'});
    
        



    this.creaFoglioDiLavoroRegola = function($width, $height, $idElement, $validateConnectionFnc){
        this.grafo = new joint.dia.Graph;

    
        this.foglioDiLavoro = new joint.dia.Paper({  
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
          validateEmbedding: function(childView, parentView) {
              return parentView.model instanceof joint.shapes.devs.Coupled;
          },
          /*
          validateConnection: function(sourceView, sourceMagnet, targetView, targetMagnet) {
              return sourceMagnet != targetMagnet;
          }
          */
          validateConnection: $validateConnectionFnc,
        });
    };


    this.creaFoglioDiLavoroOperatoreComplesso = function($width, $height, $idElement, $validateConnectionFnc){
        this.creaFoglioDiLavoroRegola($width, $height, $idElement, $validateConnectionFnc);
        var operatoreComplesso = new joint.shapes.devs.Coupled({
            position: {
                x: 10,
                y: 0
            },
            size: {
                width: $width-20,
                height: $height,
            },
        inPorts: [],
        outPorts: []
        });
        this.grafo.addCell(operatoreComplesso); 
        //L'operatore complesso NON si può muovere
        /*
        this.foglioDiLavoro.setInteractivity(function(cellView, method){
            console.log(cellView);
            console.log(method);
            return cellView.model.id !== operatoreComplesso.id;
        });
        */

        /*
        operatoreComplesso.on('change:position', function(model,changes,opt){
            var position = model.get('position');
            operatoreComplesso.attr('transform','translate(10,0)');

        });

        */

        operatoreComplesso.attr('.label/text', 'Operatore complesso');

        this.operatoreComplesso = operatoreComplesso;
        return this.operatoreComplesso;

    }
    
/**
 * Input: posizione [x,y] rispetto foglio di lavoro
 * inPorts: array di id delle porte di ingresso
 * outPorts: array di id porte di uscita
 * 
 */
this.aggiungiOperatore = function($positionX, $positionY, $inPorts, $outPorts, $inPortsTypes,
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
      if(this.grafo != '')
        this.grafo.addCell(operatore);
    if(this.operatoreComplesso != '')
        this.operatoreComplesso.embed(operatore);
    return operatore;
};    

/**
 * Serve per aggiungere porte se il progetto tratta di un operatore complesso
 *  group: in o out
 */
this.aggiungiPorteOpComplesso = function(group, nome, tipo){
    /**
     * TODO setta tipo
     */
    if(this.operatoreComplesso!=''){
        var port = { id: nome }
        if(group === 'in'){
            this.operatoreComplesso.addInPort(port);
            //this.operatoreComplesso.set('inPorts', [nome]);
        }
        else if(group === 'out'){
            this.operatoreComplesso.addOutPort(port);
            //this.operatoreComplesso.set('outPorts', [nome]);
        }
    }
    console.log(    this.operatoreComplesso.toJSON());
};  


this.connetti = function(source, sourcePort, target, targetPort) {
    /* TODO:  CONTROLLO DEI TIPI */
    var link = new joint.shapes.devs.Link({
        source: {
            id: source.id,
            port: sourcePort
        },
        target: {
            id: target.id,
            port: targetPort
        }
    });

    link.addTo(this.grafo).reparent();
};



/*  ....ALTRO...  */ 
this.log = function(){
    console.log("Grafo:");
    console.log(this.grafo);
    console.log("FoglioLavoro: ")
    console.log(this.foglioDiLavoro);
    var cells = this.grafo.getCells();
    console.log("cells:");
    console.log(cells);
    console.log("Ports of 'Operatore': ")
    console.log(cells[2].getPorts());
}

});




