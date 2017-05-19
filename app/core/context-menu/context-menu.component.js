app.directive('contextMenu', function () {
    return {
        restrict:'E',
    templateUrl: '',
    controller: ['$scope', "$log" ,"FoglioDiLavoroService", ContextMenuController]
    };
});

function ContextMenuController($scope, $log, FoglioDiLavoroService) {
}