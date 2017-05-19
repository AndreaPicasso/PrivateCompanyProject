app.directive('editor', function () {
    return {
        restrict:'E',
        templateUrl: 'core/editor/editor.component.html',
    controller: ['$scope', "$log","$window", "ListaOperatoriService","FoglioDiLavoroService", EditorController]
    };
});


function EditorController($scope, $log,$window, ListaOperatoriService, FoglioDiLavoroService) {
    
    //this.operatori = [];
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
        TODO: Si è deciso di non implementare op complesso ...
     */
    this.nuovoOpComplesso = function(){
        $scope.operatori = ListaOperatoriService.loadJSONOperatori();
        this.hasPaper = true;
        //...


     }

     this.nuovaPortaOpCompl = function(){

     }

     

     this.chiudiFoglioDiLavoro = function(){
        this.hasPaper = false;
        $scope.operatori = [];
        FoglioDiLavoroService.paper.model.clear();
        FoglioDiLavoroService.paper.remove();
        FoglioDiLavoroService.paper = "";
        FoglioDiLavoroService.nomeFoglioDiLavoro = "";
        $scope.descrizione='';


     }

     this.verificaCorrettezza = function(){
        $window.alert(FoglioDiLavoroService.verificaCorrettezza());
       
     }

     this.esportaRegola = function(){
            console.log("Cliccao espoeta regola");
          FoglioDiLavoroService.esportaRegola();
     }


    $scope.nuovaRegola = this.nuovaRegola;
    $scope.nuovoOpComplesso = this.nuovoOpComplesso;
    $scope.nuovaPortaOpCompl = this.nuovaPortaOpCompl
    $scope.esportaRegola = this.esportaRegola;
    $scope.verificaCorrettezza = this.verificaCorrettezza;
    $scope.chiudiFoglioDiLavoro = this.chiudiFoglioDiLavoro;
    $scope.hasPaper = this.hasPaper;
    //$scope.operatori = this.operatori;


}
    
