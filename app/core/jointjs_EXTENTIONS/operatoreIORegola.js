operatoreIORegola = operatore.extend({
    
    molteplicita: "",
    sensorIDs: [],

    esportaXML: function(){

    },

    fromJSON: function(){

    },

    isOperatoreElementare: function(){
        return false;
    },

    isOperatoreComplesso: function(){
        return false;
    },

    isOperatoreIO: function(){
        return true;
    }
});