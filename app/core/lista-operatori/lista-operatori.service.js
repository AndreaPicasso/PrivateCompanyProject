
app.service('ListaOperatoriService', function($http, $q, FoglioDiLavoroService){
var opClicked='';
    var isClickedOp=false;
    var opClickedTipo='';
    this.operatori = [];



    var myJSON = $q.defer();
    $http.get('core/lista-operatori/JSONOperatori.json') //File json operatori
    .then(function(res){
        myJSON.resolve(res); 
    }); 
    this.JSONOperatori = myJSON.promise.$$state;
    
    this.loadJSONOperatori = function(){
        this.operatori = this.JSONOperatori.value.data;
        return this.operatori;
    }



    /*
        MODIFICA RISPETTO ALLA FASE DI MODELLING
        In un primo momento si è scelto di fare a meno del drag&drop
        per problemi di compatibilita tra le librerie utilizzate
        L'inserimento di un operatore avverrà semplicemente selezionando un operatore
        dalla lista presente
        Si è scelto di continuare a chiamare la funzione del foglio di lavoro "onDrop"
        per coerenza con i modelli
    */
    this.onClickLista=function($event,JSONop,opT){
        FoglioDiLavoroService.onDrop(JSONop, opT);
    }


});