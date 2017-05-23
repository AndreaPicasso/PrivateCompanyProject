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
            this.hasPaper = true;
            $scope.operatori = ListaOperatoriService.loadJSONOperatori();
            FoglioDiLavoroService.creaFoglioDiLavoroRegola('fogliodilavoro', function(){return true});
            FoglioDiLavoroService.nomeFoglioDiLavoro = $window.prompt(
                                                        "Inserisci il nome della regola:", "rule_n");


        }
        else{
            $window.alert("Chiudere foglio di lavoro corrente prima di procedere");
        }  


     }

     /*
        SEMPLIFICAZIONE: Si è deciso di non implementare op complesso ...
     */
    this.nuovoOpComplesso = function(){
        $scope.operatori = ListaOperatoriService.loadJSONOperatori();
        this.hasPaper = true;
        //...


     }
     /*
        SEMPLIFICAZIONE: Non avendo implementato l'operatore complesso anche questa funzione
        è rimasta non implementata
     */
     this.nuovaPortaOpCompl = function(){

     }

     
    /*
        Chiude il foglio di lavoro eliminando il grafo (model) e il paper
     */
     this.chiudiFoglioDiLavoro = function(){
        this.hasPaper = false;
        $scope.operatori = [];
        FoglioDiLavoroService.paper.model.clear();
        FoglioDiLavoroService.paper.remove();
        FoglioDiLavoroService.paper = "";
        FoglioDiLavoroService.nomeFoglioDiLavoro = "";
        $scope.descrizione='';


     }
     /*
        Verifica la correttezza della regola presente sul foglio di lavoro aperto
     */
     this.verificaCorrettezza = function(){
         
        $window.alert(FoglioDiLavoroService.verificaCorrettezza());
       
     }
     /*
        Esporta in formato XML la regola presete su foglio di lavoro
     */
     this.esportaRegola = function(){
          FoglioDiLavoroService.esportaRegola();
     }


    $scope.nuovaRegola = this.nuovaRegola;
    $scope.nuovoOpComplesso = this.nuovoOpComplesso;
    $scope.nuovaPortaOpCompl = this.nuovaPortaOpCompl
    $scope.esportaRegola = this.esportaRegola;
    $scope.verificaCorrettezza = this.verificaCorrettezza;
    $scope.chiudiFoglioDiLavoro = this.chiudiFoglioDiLavoro;
    $scope.hasPaper = this.hasPaper;
    


}
    
