app.directive('editor', function () {
    return {
        restrict:'E',
        templateUrl: 'core/editor/editor.component.html',
    controller: ['$scope', "$log","$window", "ListaOperatoriService","FoglioDiLavoroService", EditorController]
    };
});


function EditorController($scope, $log,$window, ListaOperatoriService, FoglioDiLavoroService) {
    
    this.operatori = [];
    this.hasPaper = false;

    this.nuovaRegola = function(){
        if(!this.hasPaper){
            this.operatori = ListaOperatoriService.loadJSONOperatori();
            //console.log(this.operatori);
            FoglioDiLavoroService.creaFoglioDiLavoroRegola('fogliodilavoro', function(){return true});
            this.hasPaper = true;
            FoglioDiLavoroService.nomeFoglioDiLavoro = $window.prompt(
                                                        "Inserisci il nome della regola:", "rule_n");


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

     

     this.chiudiFoglioDiLavoro = function(){
        this.hasPaper = false;
        this.operatori = [];
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


     /* TODO: NON VA QUI, TOGLIERE E METTERE IN FOGLIO DI LAVORO */
    this.onDropComplete=function(data,evt){
            var index = $scope.droppedObjects2.indexOf(data);
            if (index == -1) {
                $scope.droppedObjects2.push(data);
            }
        }

    $scope.nuovaRegola = this.nuovaRegola;
    $scope.nuovoOpComplesso = this.nuovoOpComplesso;
    $scope.nuovaPortaOpCompl = this.nuovaPortaOpCompl
    $scope.esportaRegola = this.esportaRegola;
    $scope.verificaCorrettezza = this.verificaCorrettezza;
    $scope.chiudiFoglioDiLavoro = this.chiudiFoglioDiLavoro;
    $scope.hasPaper = this.hasPaper;
    $scope.operatori = this.operatori;




  $scope.player = {
          gold: 100
      };
      $scope.items = [
          { name: 'Small Health Potion', cost: 4 },
          { name: 'Small Mana Potion', cost: 5 },
          { name: 'Iron Short Sword', cost: 12 }
      ];
      $scope.menuOptions = [
          ['Buy', function ($itemScope) {
              $scope.player.gold -= $itemScope.item.cost;
          }],
          null,
          ['Sell', function ($itemScope) {
              $scope.player.gold += $itemScope.item.cost;
          }, function ($itemScope) {
              return $itemScope.item.name.match(/Iron/) == null;
          }],
          null,
          ['More...', [
              ['Alert Cost', function ($itemScope) {
                  alert($itemScope.item.cost);
              }],
              ['Alert Player Gold', function ($itemScope) {
                  alert($scope.player.gold);
              }]
          ]]
      ];
    	$scope.otherMenuOptions = [
          ['Favorite Color', function ($itemScope, $event, color) {
          		alert(color);
          }]
      ];


}
    
