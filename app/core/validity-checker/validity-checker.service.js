
angular.module('myApp').
  service('ValidityCheckerService', function(){


    this.almenoUnaSink=function(grafo){
      var sinks=grafo.getSinks();

        return sinks.length!=0;
        
    }


    this.almenoUnaSource=function(grafo){
          var sources=grafo.getSources();
          var i;
          var toCheck = new Array();
          for(i=0; i<sources.length;i++){
            if(sources[i].isOperatoreIO()){
                toCheck.push(sources[i]);
            }
          }
        return toCheck.length!=0;
        
    }

/*
 TODO: forse c'è un problema,
 source  (molt = 1) e costante collegate a differenza NON collegato a sink (molt = 1)
 da che molt. è errata 
*/
    this.controlloMolteplicita=function(grafo){
        var toCheck=grafo.getSinks();
        var sources=grafo.getSources();
        var i;
        for(i=0; i<sources.length;i++ ){
            if(sources[i].isOperatoreIO()){
                toCheck.push(sources[i]);
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

        if(!this.tuttoCollegato(grafo)) {
            message="Non tutto collegato.";
        }
        if(!this.almenoUnaSink(grafo)) {
            message=message+" Mancanza porta out.";
        }
        if(!this.almenoUnaSource(grafo)) {
            message=message+" Mancanza porta in.";
        }
         if(!this.controlloMolteplicita(grafo)) {
            message=message+" Molteplicita errata.";
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
    this.correttezzaLink = function(cellViewS, magnetS, cellViewT, magnetT, end, linkView){
        /*
        TODO:  FINIRE
            NON FUNZIONA BENE, FORSE MEGLIO FARLO IN PAPER ON LINK::CONNECT??
        - controllo tipo
        - controllo collegamento in - out o vice e versa
        - controllo porta out può essere collegata solo ad un in
        */
            var source = cellViewS.model;
            var target = cellViewT.model;
            var link = linkView.model;
            // console.log(target);
            // console.log(link.attributes);
            
            if(link.attributes.target.port == undefined){
                //Non ancora finito di collegare
                return true;
            }
            //Ottengo le porte;
            var sourcePort = source.getPort(link.attributes.source.port);
            var targetPort = target.getPort(link.attributes.target.port);
            if(sourcePort.tipo != targetPort.tipo){
                console.log("Tipi non corrispondono");
                return false;
            }
            if(sourcePort.group == targetPort.group){
                console.log("No collegamenti in-in o out-out");
                return false;
            }


            return true
            }  

});