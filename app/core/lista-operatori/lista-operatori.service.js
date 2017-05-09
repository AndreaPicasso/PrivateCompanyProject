'use strict';


angular.module('myApp').service('ListaOperatoriService', function($http, $q){

    var myJSON = $q.defer();

    this.loadJSONOperatori = function(){
        $http.get('core/lista-operatori/JSONOperatori.json') //File json operatori
       .then(function(res){
            myJSON.resolve(res); 
        });
    }    
    
    this.JSONOperatori = myJSON.promise.$$state;
    console.log(this.JSONOperatori);


});