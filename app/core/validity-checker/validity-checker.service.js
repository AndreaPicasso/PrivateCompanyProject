


    


angular.module('myApp').
  service('ValidityCheckerService', function(){
    this.almenoUnaSink=function(grafo){
      var sink=grafo.getSinks();
        // return sink!=[];
        return false;
    }
    this.almenoUnaSource=function(grafo){
          var source=grafo.getSources();
        // return source!=[];
        return false;
    }
    this.controlloMolteplicita=function(grafo){
        return false;
        //da terminare usando il sequence diagramm rispettivo
    }
    this.tuttoCollegato=function(grafo){
    //   var link=grafo.getLinks();
    //   var element=grafo.getElements();
    //   var i;
    //   var ports= new Array();
    //   for(i=0; i<link.lenght(); i++){
    //       ports[i]=element[i].getPorts();
    //   }
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