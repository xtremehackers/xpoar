angular.module('ARHackathon')
    .directive('scales', function () {
    return {
        restrict: 'EA',        
        scope: {
            entityMass: '@',
            entityName: '@',
            entitySize: '@'
        },
        template: `<div class="icon-btn" style="margin-top: 10px;"><i class="fa fa-search-plus"  ng-click="zoomIn()"></i></div>
                   
                        <div class="icon-btn" style="margin-top: 10px;"><i class="fa fa-search-minus"  ng-click="zoomOut()"></i></div>

                        <div class="icon-btn" style="margin-top: 10px;"><i class="fa fa-repeat"  ng-click="rotateClockWise()"></i></div>
                   
                        <div class="icon-btn" style="margin-top: 10px;"><i class="fa fa-undo"  ng-click="rotateAntiClockWise()"></i></div>`,
        link: function ($scope,$http,element, attrs) {
            $scope.zoomIn = function(){
                
                  var scale = document.getElementById("entity").getAttribute("scale");
                  scale.x = scale.x + 0.01;
                  scale.y = scale.y + 0.01;
                  scale.z = scale.z + 0.01;
                  document.getElementById("entity").setAttribute("scale",scale);
                
            }
           
            $scope.zoomOut = function(){
                
                  var scale = document.getElementById("entity").getAttribute("scale");
                  scale.x = scale.x - 0.01;
                  scale.y = scale.y - 0.01;
                  scale.z = scale.z - 0.01;
                  document.getElementById("entity").setAttribute("scale",scale);
                
            }
            
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