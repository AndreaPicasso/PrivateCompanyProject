'use strict';


angular.module('myApp').service('ListaOperatoriService', function($http){

    this.JSONOperatori = []

    this.loadJSONOperatori = function(){
        $http.get('core/lista-operatori/JSONOperatori.json') //File json operatori
       .then(function(res){
           console.log(res);   
            this.JSONOperatori = res.data; 
                        
        });
    }

});