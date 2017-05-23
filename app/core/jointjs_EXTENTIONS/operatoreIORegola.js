operatoreIORegola = operatore.extend({
    
    molteplicita: "",
    sensorIDs: "",



    printSensorIDs: function(){
        var str="";
        var k;
        for(k=0; k<this.sensorIDs.length;k++){
            str=str+'<property name="sensorId_'+(k+1)+'" value="'+this.sensorIDs[k]+'"/>';
        }
        return str;
    },
    /*
       Funzione che si occupa di costruire la parte dell'xml relativa all'operatoreIORegola in questione
    */
    esportaXML: function(){
        var out ="";
        var ports = this.getPorts();

        for(var i = 0; i<ports.length; i++){
            if(ports[i].group == 'in'){
                if(i==0){
                    out=out+'<entity name="'+this.nome+'_' + this.id + 'class="package.Sink"/>';
                    out=out+this.printSensorIDs();
                }
                out += '<port name="'+ports[i].id+'" class="package.IPort"/>';
            }
            else{
                if(i==0){
                    out=out+'<entity name="'+this.nome+'_' + this.id + 'class="package.Source"/>';
                    out=out+this.printSensorIDs();
                }
                out += '<port name="'+ports[i].id+'" class="package.OPort"/>';
            }
        }
        out += ' </entity>';
        return out;

    },

    /*
        Generiamo l'elemento operatore che verrà renderizzato sul foglio di lavoro
        a partire dal JSON della listaOperatori
    */
    fromJSON: function(JSONtype, JSONoperatore, nome){
       var operatore = new joint.shapes.devs.Atomic({
            position: {
                x: 50 + Math.floor(Math.random()*(51)),
                y: 50 + Math.floor(Math.random()*(51))
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
        // setto attributi relativi a joint js
        this.attributes = operatore.attributes;
        this.changed = operatore.changed;
        this.cid = operatore.cid;
        this.id = operatore.id;
        this.ports = operatore.ports;
        var ports = JSONtype.ports.items;
        var port = '';
        for(i = 0; i<ports.length; i++){
            port = new myPortObject();
            port.group = ports[i].group;
            port.attrs = ports[i].attrs;
            port.tipo = ports[i].tipo;
            //port.qta = port[i].qta;
            port.id = ports[i].id;
            this.addPort(port);
        }

        //setto attributi relativi alle nostre funzionalità
        this.hasParametro = JSONoperatore.hasParam;
        this.paramValue = JSONoperatore.paramValue;
        this.nomeParametro = JSONoperatore.nomeParametro;
        this.descrizione = JSONoperatore.descrizione;
        this.nome = JSONoperatore.nome;


        //richiedo il valore della molteplicità 
        var molteplicita = '';
        while(true){
            molteplicita = prompt("Molteplicita segnale:");
            if(molteplicita > 0){
                break;
            }
        }
        this.molteplicita = molteplicita;

        //richiedo i nomi relativi ai sensori 
        this.sensorIDs = new Array();
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