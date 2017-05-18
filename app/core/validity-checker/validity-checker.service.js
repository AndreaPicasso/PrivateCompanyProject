


    


angular.module('myApp').
  service('ValidityCheckerService', function(){
    this.almenoUnaSink=function(grafo){
      var sinks=grafo.getSinks();

        return sinks!=[];
        
    }
    this.almenoUnaSource=function(grafo){
          var sources=grafo.getSources();
          var i;
          var toCheck;
          for(i=0; i<sources.length;i++){
            if(sources[i].isOperatoreIO()){
                toCheck.push(sources[i]);
            }
          }
          console.log(toCheck);
        return typeof(toCheck)!="undefined";
        
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
    this.tuttoCollegato=function(grafo){
       var links=grafo.getLinks();
      var element=grafo.getElements();
      var i;
      var ports= new Array();
      for(i=0; i<links.length; i++){
          ports[i]=element[i].getPorts();
      }
      return false;
      //Simo termina qui guardando il tuo sequence diagram poi fammi ritornare un bool
    }

    this.verificaCorrettezza=function(grafo){
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