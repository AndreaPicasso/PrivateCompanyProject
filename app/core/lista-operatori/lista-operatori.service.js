'use strict';


app.service('ListaOperatoriService', function($http, $q){

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


});