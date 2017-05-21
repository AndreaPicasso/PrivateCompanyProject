
angular.module('myApp').
  service('ValidityCheckerService', function(){


    this.almenoUnaSink=function(grafo){
      var sinks=grafo.getSinks();
      /*
        TODO: PROBLEMA
        La libreria joint non distingue in sinks/sources 
        getSinks() getSources() forniscono lo stesso risultato
      */
      var count = 0;
      for(var i=0; i<sinks.length;i++){
            if(sinks[i].isOperatoreIO() && sinks[i].nome=='Sink'){
                count++;
            }
        return count!=0;
      }
    }


    this.almenoUnaSource=function(grafo){
          var sources=grafo.getSources();
          var i;
          var count = 0;
          for(i=0; i<sources.length;i++){
            if(sources[i].isOperatoreIO() && sources[i].nome=='Source'){
               count++;
            }
          }
        return count!=0;
        
    }

/*
    Il diagramma della fase di modelling viene lievemente modificato in quanto la libreria joint
    non distingue tra Sources e Sinks, getSources e getSinks danno lo stesso risultato
    (qualunque operatore abbia una porta è sia sink che source)
*/
    this.controlloMolteplicita=function(grafo){
        var sourcesSinks=grafo.getSources();
        var toCheck= new Array();
        var i;
        for(i=0; i<sourcesSinks.length;i++ ){
            if(sourcesSinks[i].isOperatoreIO()){
                toCheck.push(sourcesSinks[i]);
            }
        }
        if(toCheck.length == 0){
            return true;
        }
        var sampleMolt=toCheck[0].molteplicita;
        for(i=0; i<toCheck.length;i++){
            if(toCheck[i].molteplicita!=sampleMolt){
                return false;
            }
        }
        return true;
    }


/*
    Ho riscontrato un errore rispetto a quanto riportato nel modello di sequenza
    in quanto non basta controllare che siano uguali l'id della porta e l'id della porta di un link
    perchè l'id della porta è univoco all'interno dell'operatore non globalmente
    L'algoritmo seguente è stato lievemente modificato al fine di tenere traccia di quale elemento appartiene
    la porta
*/

    this.tuttoCollegato=function(grafo){
        var links=grafo.getLinks();
        var operatori=grafo.getElements();
        var portsOperatore = new Array();
        var ok = true;
        var collegamentotoTrovato = false;
        //Per ogni operatore
        for(var i=0; i<operatori.length; i++){
            portsOperatore = operatori[i].getPorts();
            //per ogni porta di ogni operatore
            for(var j = 0; j<portsOperatore.length; j++){
                collegamentoTrovato = false;
                //per ogni link
                for(var k = 0; k<links.length; k++){
                    if((portsOperatore[j].id== links[k].attributes.source.port && 
                    operatori[i].id == links[k].attributes.source.id) || 
                    (portsOperatore[j].id== links[k].attributes.target.port && 
                    operatori[i].id == links[k].attributes.target.id))
                    {
                            collegamentoTrovato = true;
                            break;    
                    }
                }
                if(!collegamentoTrovato){
                    ok = false;
                    break;
                }
            }
            }
      return ok;
    }

    this.verificaCorrettezza=function(grafo){
    /*
        TODO: problemi se verifica correttezza di foglio vuoto
        secondo macchina a stati non dovrebbe essere possibile -> bottone disabilitato
    */        
      var message="";

        if(!this.almenoUnaSink(grafo)) {
            message=message+"Mancanza porta out. ";
        }
        if(!this.almenoUnaSource(grafo)) {
            message=message+"Mancanza porta in. ";
        }
         if(!this.controlloMolteplicita(grafo)) {
            message=message+"Molteplicita errata. ";
        }
        if(!this.tuttoCollegato(grafo)) {
            message=message+"Non tutto collegato. ";
        }
        if(message==""){
          message="Regola corretta!";
        }
        
        return message;
        
    }


    /*
        Rispetto a quanto riportato in fase di modellazione, siamo riusciti a farci passare 
        anche il linkView, il che semplifica le operazioni di controllo
    */
    this.correttezzaLink = function(linkToCheck, sourcePort, targetPort, targetOperator, sourceOperator, links){
        /*
        CONTROLLI:
        - controllo tipo
        - controllo collegamento in - out o vice e versa
        - controllo una porta in può avere un solo link collegato
        */
        if(sourcePort.tipo != targetPort.tipo){
            return "Tipi non corrispondono";
       }

        if(sourcePort.group == targetPort.group){
            return "No collegamenti in-in o out-out";
        }
        //Controllo porta di in un solo link collegato:
        //inOperator = operatore connesso tramite la porta di ingresso
        var inOperator; 
        var idInPort;
        if(targetPort.group == 'in'){
            inOperator = targetOperator;
            idInPort = targetPort.id;
        }
        else{
            inOperator = sourceOperator;
            idInPort = sourcePort.id;
        }
        for(var i = 0; i<links.length;i++){
            //Se c'è un altro link connesso come link o come source
            if(
                links[i].id != linkToCheck.id &&
                (links[i].attributes.target.id == inOperator.id &&
                    links[i].attributes.target.port == idInPort ) ||
                    (links[i].attributes.source.id == inOperator.id &&
                    links[i].attributes.source.port == idInPort
                )){
                    return "Porta gia connessa";
                }
        }

        return "";
    }  

});