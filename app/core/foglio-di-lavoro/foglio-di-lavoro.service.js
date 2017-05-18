'use strict';

angular.module('myApp').service('FoglioDiLavoroService', function(ValidityCheckerService){
    this.paper='';
    
    // this.grafo='';
    this.nomeFoglioDiLavoro='';
    /* TODO: togliere se implementiamo solo regola */
    this.operatoreComplesso='';

    this.creaFoglioDiLavoroRegola = function(idElement, validateConnectionFnc){
        // this.grafo = new joint.dia.Graph;
        var grafo= new joint.dia.Graph;

        /*
        E' necessario creare un nuovo div altrimenti
        al momento della cancellazione il div viene rimosso
        */
        var divPaper = document.createElement('div');
        divPaper.setAttribute("ng-click","onClickFoglio($event)");
        var element = document.getElementById(idElement);
        element.appendChild(divPaper);

        this.paper = new joint.dia.Paper({  
          el: divPaper,
          width: element.clientWidth,
          height: element.clientHeight,
          gridSize: 20,
          drawGrid: 'fixedDot',
          model: grafo,
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
        this.paper.on('link:connect', function(evt, cellView, magnet, arrowhead) {
                      console.log(evt);


            
    alert('pointerdown on a blank area in the paper.')
})
    };


    
/**
 * Input: posizione [x,y] rispetto foglio di lavoro
 * inPorts: array di id delle porte di ingresso
 * outPorts: array di id porte di uscita
 * 
 * TODO: cambiare paramentri, viene passato il json e io ricorstrusco l'operatore
 * 
 */


/*
PROVA DI SIMONE....
*/
this.onDrop = function(JSONop, tipoOp){
        var JSONtypeOp = '';
        for(var i = 0; i<JSONop.operatori.length; i++){
            if(JSONop.operatori[i].tipo == tipoOp){
                JSONtypeOp = JSONop.operatori[i].operatore
            }
            //Mi auguro che lo trovi sempre
        }
        var op = '';
        var testoOperatore = joint.util.breakText(JSONop.nome, { width: 53 });
        if(JSONop.categoria=="OperatoreElementare"){
            op=new operatoreElementare();
            op.fromJSON(JSONtypeOp, JSONop, testoOperatore);
            //console.log(op);            
        }
        else if(JSONop.categoria=="OperatoreComplesso"){
            op=new operatoreComplesso();
            op.fromJSON(JSONtypeOp, JSONop, testoOperatore);
        }
        else if(JSONop.categoria=="OperatoreIORegola"){
            op=new operatoreIORegola();
            op.fromJSON(JSONtypeOp, JSONop, testoOperatore);
            console.log(op);

        }
        if(this.paper.model != ''){
            this.paper.model.addCell(op);
        }
}



// this.onClickFoglio=function(e){
//     /*
//     PROBLEMA: FA CASINO CON JOINT, QUANDO C'è JOINT NON FUNZIONA PIU
//     */
//     if(ListaOperatoriService.isClickedOp){
//         //posiziona operatore in punto dato da x e y con la funzione aggiungi operatore
//         //da sistemare controllo tipo
//         var x=e.pageX;
//         var y=e.pageY;
//         var jop=ListaOperatoriService.opClicked;
//         var op='';
//         if(jop.categoria=="OperatoreElementare"){
//             op=new operatoreElementare();
//             op.fromJson(ListaOperatoriService.opClickedTipo);
//         }
//         else if(jop.categoria=="OperatoreComplesso"){
//             op=new operatoreComplesso();
//             op.fromJson(ListaOperatoriService.opClickedTipo);
//         }
//         else if(jop.categoria=="OperatoreIOrRegola"){
//             op=new operatoreIORegola();
//             op.fromJson(ListaOperatoriService.opClickedTipo);
//         }
//         ListaOperatoriService.isClikedOp=false;
//         ListaOperatoriService.opClicked='';
//     }
// };
       

/*
    MODO CORRETTO DI METTERE IL TIPO:
        CREO UN NUOVO ATTRIBUTO PER OGNI PORTA CHIAMATO TIPO
        L'attributo si troverà in
        operatore.attributes.ports.items[j].tipo = 'int';
        j: # porta
*/

    // for(var j = 0; j<operatore.attributes.ports.items.length; j++){
    //     var ports, types;
    //     if(operatore.attributes.ports.items[j].group == 'out'){
    //         types = $outPortsTypes;
    //         ports = $outPorts
    //     }
    //     else{
    //         types = $inPortsTypes;
    //         ports = $inPorts;
    //     }
    //     for(var i = 0; i<ports.length; i++){
    //         if(ports[i]==operatore.attributes.ports.items[j].id)
    //             operatore.attributes.ports.items[j].tipo = types[i];
    //     }
    // }


    // $testoOperatore = joint.util.breakText($testoOperatore, { width: 53 });
    // operatore.attr('.label/text', $testoOperatore);
    // if(this.grafo != ''){
    //     this.grafo.addCell(operatore);
    //   }
    // if(this.operatoreComplesso != ''){
    //     this.operatoreComplesso.embed(operatore);
    // }
      
    //     ListaOperatoriService.isClickedOp=false;
    //     ListaOperatoriService.opCliked='';
    //     return operatore; 
    // }


  this.isRule=function(){
    return true;
  };


  this.verificaCorrettezza=function(){
        return ValidityCheckerService.verificaCorrettezza(this.paper.model);
  };

  this.esportaRegola=function(){
    var stringXML;
    stringXML='<model="'+this.nomeFoglioDiLavoro+'" class="package.Rule">';
    var operatori=this.paper.model.getElements();
    var links=this.paper.model.getLinks();
    var i;
    var str='';
    for(i=0; i<operatori.length;i++){
                console.log(operatori[i]);

        str=str+operatori[i].esportaXML();
    }
    for(i=0; i<links.length; i++){
        console.log(links[i]);
        console.log(links[i].name);
        str=str+links[i].esportaXML();
    }
    console.log(str);
    stringXML=stringXML+str;
    stringXML=stringXML+'</model>';
    console.log(stringXML);



  };

  this.generaXML=function(){

  };





/*  ....ALTRO...  */ 
this.log = function(){
    console.log("Grafo:");
    console.log(this.paper.model);
    console.log("FoglioLavoro: ")
    console.log(this.paper);
    var cells = this.paper.model.getCells();
    console.log("cells:");
    console.log(cells);
    console.log("Ports of 'Operatore': ")
    console.log(cells[2].getPorts());
};

});




