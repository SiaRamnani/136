objects=[];
status="";


function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}

function start()
{
    objectDectector=ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML="status:Detecting Objects";
}

function modelloaded()
{
    console.log("model loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotresults(error,results)
{
   if(error)
       {
           console.log(error);
       }
    console.log(results);
    objects=results;
}

function draw()
{
    image(video,0,0,380,380);
    if(status != "")
    {
        objectDectector.detect(video,gotresults);
        for(i=0;i<objects.length;i++)
            {
                document.getElementById("status").innerHTML="status:Objects Detected";
                document.getElementById("number_of_objects").innerHTML="Number Of Objects Detected Are: "+objects.length;
                
                fill("red");
                percent=floor(objects[i].confidence*100);
                text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
                
                noFill();
                stroke("red");
                rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
                
                
                
                if(objects[i].label == object_name)
                    
                   {
                        video.stop();
                        objectDectector.detect(gotresults);
                        document.getElementById("status").innerHTML = object_name + " Found ";
                        synth = wiindow.speechSynthesis;
                        utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                        synth.speak(utterThis);
                    }
                else
                    {
                        document.getElementById("status").innerHTML= object_name + " Not Found ";
                    }
                    
                
                
                
            }
    }
}




