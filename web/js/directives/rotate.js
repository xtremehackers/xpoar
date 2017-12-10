angular.module('ARHackathon')
    .directive('rotates', function () {
    return {
        restrict: 'EA',        
        scope: {
            entityMass: '@',
            entityName: '@',
            entitySize: '@'
        },
        template: `<div class="icon-btn" style="margin-top: 10px;"><i class="fa fa-repeat"  ng-click="rotateClockWise()"></i></div>
                   
                        <div class="icon-btn" style="margin-top: 10px;"><i class="fa fa-undo"  ng-click="rotateAntiClockWise()"></i></div>`,
        link: function ($scope,$http,element, attrs) {
            $scope.rotateClockWise = function(){
                
                  var rotation = document.getElementById("entity").getAttribute("rotation");
                  rotation.y = rotation.y + 10;
                  document.getElementById("entity").setAttribute("rotation",rotation);
                
            }
           
            $scope.rotateAntiClockWise = function(){
                
                  var rotation = document.getElementById("entity").getAttribute("rotation");
                  rotation.y = rotation.y - 10;
                  document.getElementById("entity").setAttribute("rotation",rotation);
                
            }
        }
    }
});