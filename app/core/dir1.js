app.directive('dirPippo', function () {
    return {
        restrict:'E',
        template: '',
        controller: function ($scope) {
            $scope.prova_pippo = 'pippo'
        }
    };
});