
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


    this.onClickLista=function($event,JSONop,opT){
        // this.isClicedkOp=true;
        // this.opClicked=op;
        // this.opClickedTipo=opT;
        // console.log(op);
        // console.log(this.opClickedTipo);
        FoglioDiLavoroService.onDrop(JSONop, opT);
    }


});