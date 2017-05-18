operatoreIORegola = operatore.extend({
    
    molteplicita: "",
    sensorIDs: new Array(),

    esportaXML: function(){
     

    },

    fromJSON: function(JSONtype, JSONoperatore, nome){
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

        this.hasParametro = JSONoperatore.hasParam;
        this.paramValue = JSONoperatore.paramValue;
        this.nomeParametro = JSONoperatore.nomeParametro;
        this.descrizione = JSONoperatore.descrizione;
        this.nome = JSONoperatore.nome;


        var ports = JSONtype.ports.items;
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
        }
        var molteplicita = '';
        while(true){
            molteplicita = prompt("Molteplicita segnale:");
            if(molteplicita > 0){
                break;
            }
        }
        this.molteplicita = molteplicita;
        for(var i = 0; i<molteplicita; i++){
            this.sensorIDs.push(prompt("Nome segnale "+i+":"));
        }

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