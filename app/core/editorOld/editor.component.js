app.directive('editor', function () {
    return {
        restrict:'E',
        templateUrl: 'core/editor/editor.component.html',
    controller: ['$scope', "$log","$window", "ListaOperatoriService","FoglioDiLavoroService", EditorController]
    };
});




function EditorController($scope, $log,$window, ListaOperatoriService, FoglioDiLavoroService) {

     
   
    this.hasPaper = false;

     this.nuovaRegola = function(){
        if(!this.hasPaper){
            this.operatori = ListaOperatoriService.loadJSONOperatori();
            FoglioDiLavoroService.creaFoglioDiLavoroRegola('fogliodilavoro', function(){return true});
            this.hasPaper = true;
            FoglioDiLavoroService.nomeFoglioDiLavoro = $window.prompt(
                                                        "Inserisci il nome della regola:", "rule_n");


            /* NON SAREBBE ASSOLUTAMENTE DA FARE QUI: */    
            FoglioDiLavoroService.onDrop(10,10,['in1', 'in2'],['out1'], ['int','int'],['int'], 'Somma');
        }
        else{
            $window.alert("Chiudere foglio di lavoro corrente prima di procedere");
        }  


     }

     this.nuovoOpComplesso = function(){
        this.operatori = ListaOperatoriService.loadJSONOperatori();
        this.hasPaper = true;
        //...


     }

     this.nuovaPortaOpCompl = function(){

     }

     //TOCHECK questo foglio e la cartella sono da eliminare

     this.chiudiFoglioDiLavoro = function(){
        this.operatori = [];
        this.hasPaper = false;
        FoglioDiLavoroService.grafo.clear();
        FoglioDiLavoroService.paper.remove();
        FoglioDiLavoroService.paper = "";
        FoglioDiLavoroService.grafo = "";
        FoglioDiLavoroService.nomeFoglioDiLavoro = "";


     }

     this.verificaCorrettezza = function(){
                 

        $window.alert(FoglioDiLavoroService.verificaCorrettezza());
       
     }

     this.esportaRegola = function(){
          FoglioDiLavoroService.esportaRegola();
     }



}
    
