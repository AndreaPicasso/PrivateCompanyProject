'use strict';


angular.module('myApp').service('ListaOperatoriService', function($http, $q){

    var myJSON = $q.defer();
    $http.get('core/lista-operatori/JSONOperatori.json') //File json operatori
    .then(function(res){
        myJSON.resolve(res); 
    });
        
    this.JSONOperatori = myJSON.promise.$$state;
    
    this.loadJSONOperatori = function(){
        return this.JSONOperatori.value.data;
    }


});