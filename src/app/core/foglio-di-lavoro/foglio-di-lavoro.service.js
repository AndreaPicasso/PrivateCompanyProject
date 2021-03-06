/**
 *  FoglioDiLavoroRegola
 * 
 *  MODIFICA RISPETTO ALLA FASE DI MODELLING
 *  Abbiamo deciso di non implementare la parte relativa all'operatore complesso,
 *  la scelta è dovuta sia ad un fattore di tempo sia al fatto che angular non permette
 *  di derivare i service in maniera pulita -> non sarebbe possibile rispettare il Class Diagram
 *  Abbiamo inoltre deciso di non mostrare la descrizione di un operatore già presente sul foglio
 *  di lavoro in quanto ritenuto di scarsa utilità e macchinoso da eseguire (i Service, come questo
 *  che gestisce il foglio di lavoro joint, non possono modificare aspetti grafici della pagina
 *  appartenenti a angular)
 * 
 */


app.service('FoglioDiLavoroService', function(ValidityCheckerService, $window, $compile){
    
    this.paper='';
    this.nomeFoglioDiLavoro='';



    /*
        Creazione del foglio di lavoro come paper fornito da joint js
    */
    this.creaFoglioDiLavoroRegola = function(idElement){
        var grafo= new joint.dia.Graph;
        //E' necessario creare un nuovo div dove inserire l'elemento joint js paper altrimenti
        //al momento della cancellazione il div viene rimosso
        var element= angular.element( document.querySelector(idElement));
        var divPaper = angular.element('<div></div>');
        $( "#"+idElement ).append(divPaper);
        var element = document.getElementById(idElement);

        this.paper = new joint.dia.Paper({  
          el: divPaper,
          width: element.clientWidth,
          height: element.clientHeight,
          gridSize: 20,
          drawGrid: 'fixedDot',
          model: grafo,
          snapLinks: { radius: 75 },
          linkPinning: false,
          embeddingMode: true,
          highlighting: {
              'default': {
                  name: 'stroke',
                  options: {
                      padding: 6
                  }
              },
              'embedding': {
                  name: 'addClass',
                  options: {
                      className: 'highlighted-parent'
                  }
              }
          }
        });      
        //Cosa fare al momento della connessione  di un link
         this.paper.on('link:connect', function(evt, magnet, cellView, arrowhead) {
            var linkToCheck = evt.model;
            var targetOperator = cellView.model;
            var sourceOperator = linkToCheck.getSourceElement();
            var targetPort = targetOperator.getPort(linkToCheck.attributes.target.port);
            var sourcePort = sourceOperator.getPort(linkToCheck.attributes.source.port);
            var links = targetOperator.graph.getLinks();
            
            //Controllo Correttezza connessione
            //Rispetto a quanto riportato nel diagramma delle classi ( validateConnection(..) ), 
            //siamo riusciti ad ottenere anche il link, il che semplifica le operazioni di controllo
            var err = ValidityCheckerService.correttezzaLink(linkToCheck, sourcePort, targetPort,
                                                             targetOperator, sourceOperator, links);
            if(err ==""){
                var link=new myLink();
                // Al momento dell'inserimento i link vengono generati in automatico,
                // rimuoviamo quello inserito e inseriamo il nostro myLink
                link.attributes=linkToCheck.attributes;
                link.changed=linkToCheck.changed;
                link.ports=linkToCheck.ports;
                link.id=linkToCheck.id;
                link.cid=linkToCheck.cid;
                linkToCheck.remove();
                targetOperator.graph.addCell(link);
            } else {
                linkToCheck.remove();
                $window.alert(err);
            }
        });
        //ContextMenu
        this.paper.on('cell:contextmenu', function(cellView,evt,x,y) {
            var contextMenu = new ContextMenu();
            contextMenu.createContextMenu(cellView,evt,x,y,$window);
        });
    };



    /*
    Inserimento Operatore
    (In realtà come specificato in lista-operatori.service.js è richiamato all'onClick, si è deciso
    di continuarlo a chiamare onDrop per coerenza con il Modelling)
    -> tale modifica ha evitato di effettuare la verifica: "controllo validità punto di rilascio"
    */
    this.onDrop = function(JSONop, tipoOp){
        var JSONtypeOp = '';
        for(var i = 0; i<JSONop.operatori.length; i++){
            if(JSONop.operatori[i].tipo == tipoOp){
                JSONtypeOp = JSONop.operatori[i].operatore
            }
        }
        var op = '';
        var testoOperatore = joint.util.breakText(JSONop.nome, { width: 53 });
        if(JSONop.categoria=="OperatoreElementare"){
            op=new operatoreElementare();
        }
        else if(JSONop.categoria=="OperatoreComplesso"){
            op=new operatoreComplesso();
        }
        else if(JSONop.categoria=="OperatoreIORegola"){
            op=this.nuovoIO(JSONop.nome);
        }
        //Nel modelling è stato indicato come "richiamato dal costruttore"
        //Qui però il costruttore non c'è
        op.fromJSON(JSONtypeOp, JSONop, testoOperatore);
        if(this.paper.model != ''){
            this.paper.model.addCell(op);
        }
    }



    /*
        nuovoIO: si occupa di gestire le interazioni aggiuntive con l'utente
        rispetto ad un operatore elementare o complesso
        rispetto al modelling è stato rimosso il "controllo validita tipo"
        in quanto il tipo è selezionato da una lista da noi creata e dunque sicuramente corretto
    */
    this.nuovoIO = function(group){
        var opIO = new operatoreIORegola();
         //richiedo il valore della molteplicità 
        var molteplicita = '';
        while(true){
            molteplicita = $window.prompt("Molteplicita segnale di "+group+":");
            if(molteplicita > 0){
                break;
            }
        }
        opIO.molteplicita = molteplicita;
        //richiedo i nomi relativi ai sensori 
        opIO.sensorIDs = new Array();
        for(var i = 0; i<molteplicita; i++){
            opIO.sensorIDs.push($window.prompt("Nome segnale "+i+":"));
        }
        return opIO;

    }



    this.isRule=function(){
        return true;
     };



    this.verificaCorrettezza=function(){
        //Se il foglio di lavoro non ha elementi (cell di joint js) la verifica correttezza non viene eseguita
        if(this.paper.model.getCells().length==0){
            return "Foglio di lavoro vuoto!";
        }
            ValidityCheckerService.grafo = this.paper.model;
            return ValidityCheckerService.verificaCorrettezza(this.paper.model);
    };


            
    this.esportaRegola=function(){
        //Controllo correttezza
        var correttezza = this.verificaCorrettezza()
        if( correttezza == 'Regola corretta!'){
                //Esportazione ricorsiva (Vedi diagramma modelling)
                var stringXML = this.generaXML();
                //Salva il file...
                var filename =  this.nomeFoglioDiLavoro+'.xml'       
                var blob = new Blob([stringXML], {type: 'text/plain'});
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveOrOpenBlob(blob, filename);
                } else {
                        var e = document.createEvent('MouseEvents'),
                        a = document.createElement('a');
                        a.download = filename;
                        a.href = window.URL.createObjectURL(blob);
                        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
                        e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        a.dispatchEvent(e);
                }
            } else {
                $window.alert("Regola non corretta! Risolvere i seguenti problemi prima di esportarla: "+correttezza);
            }
    };



    this.generaXML=function(){
            var stringXML = '<?xml version="1.0" standalone="no"?> <!DOCTYPE model PUBLIC "-//UC Berkeley//DTD MoML'
                            +' 1//EN" "http://ptolemy.eecs.berkeley.edu/xml/dtd/MoML_1.dtd">';
            stringXML+='<model="'+this.nomeFoglioDiLavoro+'" class="package.Rule">';
            var operatori=this.paper.model.getElements();
            var links=this.paper.model.getLinks();
            var i;
            var xmlCells='';
            /*
                Rispetto al modelling, abbiamo deciso di dividere in due cicli solamente allo scopo di dare un po'
                più di ordine all' xml risultante, mettendo prima gli operatori e poi i link
            */
            for(i=0; i<operatori.length;i++){
                xmlCells+=operatori[i].esportaXML();
            }
            for(i=0; i<links.length; i++){
                xmlCells+=links[i].esportaXML();
            }
            stringXML+=xmlCells;
            stringXML+='</model>';
            return stringXML;
    };

});




