const recordContainer = document.getElementById("jsRecordContainer")
const videoPreview = document.getElementById("jsVideoPreview");
const recordBtn =  document.getElementById("jsRecordBtn");
//모든 함수에 접근 하기 위해 선언
let streamObject;
let videoRecorder;

const handleVideoDate = (event) =>{
    const { data: videoFile } = event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.webm";
    document.body.appendChild(link);
    link.click();
}

const stopRecording = () =>{
    videoRecorder.stop();
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener('click', getVideo);
    recordBtn.innerHTML = "start Recording";
}

const startRecording = () => {
    videoRecorder = new MediaRecorder(streamObject);
    //레코딩 시작
    videoRecorder.start();
    console.log(videoRecorder);
    videoRecorder.addEventListener("dataavailable", handleVideoDate)
    recordBtn.addEventListener("click", stopRecording);
}


const getVideo = async() =>{
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:{width:1280, height:720}
        });
        videoPreview.srcObject = stream;
        videoPreview.play();
        recordBtn.innerHTML = "Stop Recording";
        streamObject = stream;
        startRecording(streamObject);
    }catch(error){
        recordBtn.innerHTML = "❌ can't record";
    }finally{
        recordBtn.removeEventListener("click", getVideo);
    }
}

function init(){
    recordBtn.addEventListener('click', getVideo);
}



if(recordContainer){
    init();
}
