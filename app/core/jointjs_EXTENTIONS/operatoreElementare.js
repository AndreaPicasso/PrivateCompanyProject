operatoreElementare = operatore.extend({
    
    hasParametro: false,
    nomeParametro: "",
    paramValue: "",
    descrizione: "",


    esportaXML: function(){
        /*
        TODO: cosa vogliamo generare
        <entity name="constant_1" class="package.Constant">
         <property name="selectedValue" value="5"/>
          <port name="out_1" class="package.OPort"/> </entity>
        */
        var out ='<entity name="constant_' + this.id + '" class="package.'+this.nome+'"/>';
        if(this.hasParametro){
            out += '<property name="'+ this.nomeParametro + '" value="' +this.paramValue+ '"/>';
        }
        var ports = this.getPorts();
        for(var i = 0; i<ports.length; i++){
            if(ports[i].group == 'in'){
                out += '<port name="'+ports[i].id+'" class="package.IPort"/>';
            }
            else{
                out += '<port name="'+ports[i].id+'" class="package.IPort"/>';
            }
        }
        out += ' </entity>';
        return out;


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
            // if(port.group == 'in'){
            //     this.addInPort(port);
            // }
            // else{
            //     this.addOutPort(port);
            // }
        }



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