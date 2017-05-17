operatoreElementare = operatore.extend({
    
    hasParametro: "",
    nomeParametro: "",
    paramValie: "",
    descrizione: "",

    esportaXML: function(){
    },

    fromJSON: function(JSON, nome){
    var operatore = new joint.shapes.devs.Atomic({
        position: {
            x: 50,
            y: 50
        },
        inPorts: [],
        outPorts:  [],
        attrs:{
            '.body': {
                'rx': 6,
                'ry': 6
            },
        }
      });
      operatore.attr('.label/text', nome);
      //console.log(operatore);


      this.attributes = operatore.attributes;
      this.changed = operatore.changed;
      this.cid = operatore.cid;
      this.id = operatore.id;
      

      this.ports = operatore.ports;

        var ports = JSON.ports.items;
        var port = '';
        for(i = 0; i<ports.length; i++){
            port = new myPortObject();
            port.group = ports[i].group;
            port.attrs = ports[i].attrs;
            port.tipo = ports[i].tipo;
            /*
                TODO: aggiungere proprieta qta al JSON operatori
                TODO: JSON OPERATORI mancano convertitori
                TODO: Come aggiustare tipo Array?
                TODO: provare se funzionano tutti gli operatori
            */
            //port.qta = port[i].qta;
            port.id = ports[i].id;
            this.addPort(port);
            // if(port.group == 'in'){
            //     this.addInPort(port);
            // }
            // else{
            //     this.addOutPort(port);
            // }
        }
        console.log(this.getPorts());



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