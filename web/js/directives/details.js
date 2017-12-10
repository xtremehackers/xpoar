angular.module('ARHackathon')
    .directive('details', function () {
    return {
        restrict: 'EA',         
        scope: {
            entityMass: '@',
            entityName: '@',
            entitySize: '@'
        },
        template: `<div class="icon-btn" style="margin-top: 10px;"><i class="fa fa-info"  ng-click="details()"></i></div>
                  <div class="details-container" ng-show="showDetails">
                         <a id="close-details" ng-click="close()">
                            <i class="glyphicon glyphicon-remove"></i>
                        </a>
                        <h3>{{entityName}} :</h3>
                        <p>Weight : {{entityMass}}</p>
                        <p>Size    : {{entitySize}}</p>
                  </div> `, 
        link: function ($scope,$http,element, attrs) { 
            $scope.details = function(){
                $scope.showDetails = true;
            }
            $scope.close = function(){
                $scope.showDetails = false;
            }
        }
    }
});

