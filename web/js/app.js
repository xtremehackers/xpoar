angular.module('ARHackathon', [])
.controller('AppController',function($scope,$http){
    //$scope.showDetails = false;
    $scope.dataArray = [];
    $http.get("/xpoar/web/data/3d.json")
        .then(function(response) {
            console.log(response.data.data);
            
            $scope.dataArray = response.data.data;
            setTimeout(function(){
                initializeCarousel();
            },1000);            
        });
    
    
    $scope.selectedFile = function(file){
        if(file.files[0]){
            console.log(file.files[0]);
            var reader = new FileReader();
            reader.readAsDataURL( file.files[0] );
            
            reader.onloadend = function(){               
                $("#background-div").css("background-image", "url('" + this.result + "')");
                $(".vr").addClass("hidden");
                $(".ar").removeClass("hidden");
            }     
            
        }        
    }
    
    function initializeCarousel(){
        $(".item:first").addClass("active");
        $('.multi-item-carousel').carousel({ interval: false });
        initialiseCarouselItem();
    }

        function initialiseCarouselItem(){
    
            $('.multi-item-carousel .item').each(function(){
                    var itemToClone = $(this);

                    for (var i=1;i<6;i++) {
                    itemToClone = itemToClone.next();

                    // wrap around if at end of item collection
                    if (!itemToClone.length) {
                        itemToClone = $(this).siblings(':first');
                    }

                    // grab item, clone, add marker class, add to collection
                    itemToClone.children(':first-child').clone()
                        .addClass("cloneditem-"+(i))
                        .appendTo($(this));
                    }
                    
                    $(this).find('.3dObj').each(function(){
                        $(this).click(function(){
                             var urlData = JSON.parse(JSON.stringify($(this).data('url')));
                             $scope.selected3dData = urlData;
                             //$scope.showDetails = false;
                             var url3d = urlData["3dUrl"];
                             var scale = urlData["scale"];
                             var rotation = urlData["rotation"];
                             document.getElementById("entity").setAttribute("object-model","src:"+url3d);
                             document.getElementById("entity").setAttribute("scale",scale);
                             document.getElementById("entity").setAttribute("rotation",rotation);
                             setTimeout(function(){
                                 touch();
                             }, 1000);
                             })
                    })
            });
        }

    
});




(function(){
  
  $('#carousel-open').click(function(){
      openCarousel();
  });
  $('#carousel-close').click(function(){
      closeCarousel();
  });

}());

function openCarousel(){
	$('#theCarousel').css('display','block');
    $('#carousel-open').css('display','none');
	$('#carousel-close').css('display','inline');
}

function closeCarousel(){
	$('#theCarousel').css('display','none');
    $('#carousel-open').css('display','inline');
	$('#carousel-close').css('display','none');
}

function browseFile(obj){
        $("#my-file").click();
    }

function hideVR(obj){
        $("#background-div").css("background-image","none");
        $("#my-file").val("");
        $(".vr").removeClass("hidden");
        $(".ar").addClass("hidden");
    }


function touch(){
    var myElement = document.querySelector("canvas");
    /*new Hammer(myElement).on("panleft", function(ev) {
    console.log('left: ', ev);
    });*/
    
    
    
    var mc = new Hammer( myElement, {
        domEvents: true
      } );

	mc.get("pinch").set({ enable: true });

	mc.on("pinch", function(ev) {
	       var scale = document.getElementById("entity").getAttribute("scale");
        //console.log(scale);
        if(ev.scale < 1){
          scale.x = scale.x - 0.01;
          scale.y = scale.y - 0.01;
          scale.z = scale.z - 0.01;  
        }else{
          scale.x = scale.x + 0.01;
          scale.y = scale.y + 0.01;
          scale.z = scale.z + 0.01;  
        }
          
         //console.log("after",scale);
          document.getElementById("entity").setAttribute("scale",scale);
        
            console.log(ev.scale);
	});
    mc.on("pinchend", function(ev) {
	console.log("B");
	});
}

(function(){

    document.addEventListener("click",function(){

    //     var camera = document.querySelector("a-camera");
    //     var cursor = document.querySelector("a-cursor");
    //     var camera_pos = new THREE.Vector3().copy(camera.object3D.getWorldPosition()); // get camera's world position
    //     var cursor_pos = new THREE.Vector3().copy(cursor.object3D.getWorldPosition()); // get cursor's world position
    //     var direction = new THREE.Vector3().subVectors(cursor_pos,camera_pos); //calculate direction from camera to cursor
    //     var raycaster = new THREE.Raycaster(camera_pos,direction.normalize()); // make raycaster 
    //     var sky = document.querySelector("a-sky");
    //     var intersects = raycaster.intersectObject(sky.object3D.children[0]); //let raycaster intersect the 'a-sky' sphere
    //     console.log(intersects[0].point); 
 });
    
    /*$(".vr").click(function(){
        $("#my-file").click();
    })*/
  
}());


/*(function(){
	var myElement = document.querySelector(".details-container");
    new Hammer(myElement).on("pinch", function(ev) {
    console.log('left: ', ev);
    });
	var mc = new Hammer( myElement, {
        domEvents: true
      } );

	mc.get("pinch").set({ enable: true });

	mc.on("pinch", function(ev) {
	alert(ev);
	});
    
    mc.on( "pinchend", function( e ) {
        width = width * e.scale;
        height = height * e.scale;
        left = left * e.scale;
        top = top * e.scale;
        console.log( width );
      } );
	}());*/