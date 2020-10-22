const recordContainer = document.getElementById("jsRecordContainer");
const videoPreview = document.getElementById("jsVideoPreview");
const recordBtn = document.getElementById("jsRecordBtn");
let streamObject;
let videoRecorder;


const stopRecording = () =>{
    videoRecorder.stop();
    console.log(videoRecorder);
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener("click", getVideo);
    recordBtn.innerHTML = "Start Recording";
}

const hanldeRecordDate = (event) =>{
    console.log(event);
    //console을  출력했을때 data를 가지고온다 (blob)
    const {data : videoFile} = event;
    const link = document.createElement("a");
    //LINK에 받아온 데이터 타임을 넣어준다
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.webm";
    document.body.appendChild(link);
    link.click();
}

const startRecording = () => {
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    //state: "recording"
    console.log(videoRecorder);
    videoRecorder.addEventListener("dataavailable", hanldeRecordDate)
    recordBtn.addEventListener("click", stopRecording);
}

const getVideo = async () =>{
try{
    const stream = await navigator.mediaDevices.getUserMedia({
        audio:true,
        video:{ width:1280, height:720}
      })
      videoPreview.srcObject = stream;
      videoPreview.muted = true;
      videoPreview.play();
      recordBtn.innerHTML = "Stop Recording"
      streamObject = stream;
      startRecording(streamObject);
}catch(error){
    console.log(error);
    recordBtn.innerHTML = "🥶 can't record";
}finally{
    recordBtn.removeEventListener("click", getVideo);
}
}

 function init(){
    recordBtn.addEventListener("click", getVideo);
}

if(recordContainer){
    init()
}