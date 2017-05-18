
angular.module('myApp').
  service('ValidityCheckerService', function(){
    this.almenoUnaSink=function(grafo){
      var sinks=grafo.getSinks();

        return sinks!=[];
        
    }
    this.almenoUnaSource=function(grafo){
          var sources=grafo.getSources();

        return sources!=[];
        
    }
    this.controlloMolteplicita=function(grafo){
        var toCheck=grafo.getSinks();
        var sources=grafo.getSources();
        var i;
        var sampleMolt=toCheck[0].molteplicita;
        for(i=0; i<sources.length;i++ ){
            if(sources[i].isOperatoreIO()){
                toCheck.push(sources[i]);
            }
        }
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

});