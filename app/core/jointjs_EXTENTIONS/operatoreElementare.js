operatoreElementare = operatore.extend({
    
    hasParametro: "",
    nomeParametro: "",
    paramValie: "",
    descrizione: "",

    esportaXML: function(){
    },

    fromJSON: function(){

    },

    isOperatoreElementare: function(){
        return true;
    },

    isOperatoreComplesso: function(){
        return false;
    },

    isOperatoreIO: function(){
        return false;
    }
});