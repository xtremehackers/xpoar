angular.module('ARHackathon')
    .directive('snapshot', function () {
    return {
        restrict: 'EA',         
        scope: {
            title: '@'         
        },
        template: `<div class="icon-btn" style="margin-top: 10px;"><i class="fa fa-camera"  ng-click="snapshot()" data-toggle="modal" data-target="#screenshot"></i></div>

                  <video class="hidden" onclick="snapshot(this);" width=400 height=400 id="video" controls autoplay>
                  </video>
                  <div class="modal-content">
                    <a id="close" ng-click="closeCanvas()">
                        <i class="glyphicon glyphicon-remove"></i>
                    </a>
                     <canvas id="myCanvas" width="400" height="350"></canvas>
                  </div>             
                  `, 
        link: function ($scope, element, attrs) { 
            getSources();
            var cameraDeviceId = "";
            function getSources(){
                navigator.mediaDevices.enumerateDevices()
                .then(function(deviceInfos){
                for (var i = 0; i !== deviceInfos.length; ++i) {
                    //alert(deviceInfos[i].kind+" "+deviceInfos[i].label);
                    //console.log(deviceInfos[i]);
                    if(deviceInfos[i].label == "camera2 0, facing back"){
                       cameraDeviceId = deviceInfos[i].deviceId;
                        //alert(cameraDeviceId);
                        break;
                    }
                    
                    //alert(deviceInfos[i].label);
                }
                });
            }
            setTimeout(function(){
                startWebcam(cameraDeviceId);
            },1000);
            $scope.snapshot = function(){
                console.log("clicked");
                init();                
                snapshot();
            }
            $scope.closeCanvas = function(){
                $(".modal-content").css("display","none");
                $(".fixed-top").css("width","auto");
            }
        }
    }
});

navigator.getUserMedia = ( navigator.getUserMedia ||
                             navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia ||
                             navigator.msGetUserMedia);
var video;

var webcamStream;

      function startWebcam(cameraDeviceId) {
        //alert(cameraDeviceId);
        if(cameraDeviceId == ""){
                if (navigator.getUserMedia) {
                    navigator.getUserMedia (
                      {
                         video: true,
                         audio: false
                      },

                      // successCallback
                      function(localMediaStream) {
                         video = document.querySelector('video');
                         video.src = window.URL.createObjectURL(localMediaStream);
                         webcamStream = localMediaStream;
                         console.log("video");
                      },

                      // errorCallback
                      function(err) {
                         console.log("The following error occured: " + err);
                      }
                    );
                } else {
                   console.log("getUserMedia not supported");
                }    
        }else{
                if (navigator.getUserMedia) {
                    navigator.getUserMedia (
                      {
                         video: {
                             deviceId: {exact: cameraDeviceId}
                        },
                         audio: false
                      },

                      // successCallback
                      function(localMediaStream) {
                         video = document.querySelector('video');
                         video.src = window.URL.createObjectURL(localMediaStream);
                         webcamStream = localMediaStream;
                         console.log("video");
                      },

                      // errorCallback
                      function(err) {
                         console.log("The following error occured: " + err);
                      }
                    );
                } else {
                   console.log("getUserMedia not supported");
                } 
        }
          
            
      }

      function stopWebcam() {
          webcamStream.stop();
      }
      //---------------------
      // TAKE A SNAPSHOT CODE
      //---------------------
      var canvas, ctx;

      function init() {
        // Get the canvas and obtain a context for
        // drawing in it
        canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext('2d');
      }

      /*function snapshot() {
         // Draws current image from the video element into the canvas
         var imagesLoaded = 0;
        $(".fixed-top").css("width","100%");
        $(".modal-content").css("display","block");
        if(true){
            ctx.drawImage(video, 0,0, canvas.width, canvas.height);    
        }
        
        var canvas2 = document.querySelector('a-scene').components.screenshot.getCanvas('perspective');

        var img1 = loadImage(canvas.toDataURL(), main);
        var img2 = loadImage(canvas2.toDataURL(), main);
        function main() {
            imagesLoaded += 1;
            console.log("imgloaded" + imagesLoaded);
            if(imagesLoaded == 2) {
                // composite now
                ctx.drawImage(img1, 0, 0,400,350);                
                ctx.globalAlpha = 1;
                console.log(img2);
                ctx.drawImage(img2, 0, 0, 400, 350);
            }
        }

        function loadImage(src, onload) {
            var img = new Image();            
            img.onload = onload;
            img.src = src;
            return img;
        }
        // 
        

        // $("#img1").attr("src",canvas.toDataURL());
         $("#img2").attr("src",canvas2.toDataURL());

    }*/

    function snapshot() {
        
        var imagesLoaded = 0;
        //getting first image
        var img1;
        if($("#background-div").css("background-image") == "none"){
            ctx.drawImage(video, 0,0, canvas.width, canvas.height);
            img1 = loadImage(canvas.toDataURL(), main);
        }else{
            html2canvas(document.body).then(function(canvasOut){                    
                    img1 = loadImage(canvasOut.toDataURL(), main);  
            });
        }
       
        //getting 2nd image       
        var canvas2 = document.querySelector('a-scene').components.screenshot.getCanvas('perspective');
        var img2 = loadImage(canvas2.toDataURL(), main);

        function main() {
            imagesLoaded += 1;
            if(imagesLoaded == 2) {
                // composite now
                ctx.drawImage(img1, 0, 0,400,350);                
                ctx.globalAlpha = 1;
                console.log(img2);
                ctx.drawImage(img2, 0, 0, 400, 350);
                $(".fixed-top").css("width","100%");
                $(".modal-content").css("display","block");
            }
        }

        function loadImage(src, onload) {
            var img = new Image();            
            img.onload = onload;
            img.src = src;
            return img;
        }         

    }

