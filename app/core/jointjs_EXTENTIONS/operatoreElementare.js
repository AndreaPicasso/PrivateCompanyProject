operatoreElementare = operatore.extend({
    
    hasParametro: "",
    nomeParametro: "",
    paramValie: "",
    descrizione: "",

    esportaXML: function(){
    },

    fromJSON: function(JSON, nome){
       /* COSI NON FUNZIONA
        this.size = JSON.size;
        this.inPorts =  JSON.inPorts;
        this.outPorts =  JSON.outPorts;
        this.ports = JSON.ports;
        this.position = JSON.position;
        this.id = JSON.id;
        this.attrs = JSON.attrs;
        */

        this.attrs = {'.body': {
                            'rx': 6,
                            'ry': 6
                        }
                    };
         this.position =  {
                x: 50,
                y: 50
            };
        var ports = JSON.ports.items;
        var port = '';
        for(i = 0; i<ports.length; i++){
            port = new myPortObject();
            port.group = ports[i].group;
            port.attrs = ports[i].attrs;
            port.tipo = ports[i].tipo;
            /*
                TODO: aggiungere proprieta qta al JSON operatori
                TODO: AGGIUSTARE id porte in modo che siano conformi a: in_1 in_2 ... out_1 out_2 ...
            */
            //port.qta = port[i].qta;
            port.id = ports[i].id;
            if(port.group == 'in'){
                this.addInPort(port);
            }
            else{
                this.addOutPort(port);
            }
        }
        // TODO: vedere perche non funziona
        //var testoOperatore = joint.util.breakText(nome, { width: 53 });
        this.attr('.label/text', nome);


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