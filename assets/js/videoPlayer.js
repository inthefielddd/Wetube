import axios from "axios";
const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video")
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScrBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime"); //재생시간
const totalTime = document.getElementById("totalTime"); //토탈시간
const volumeRange = document.getElementById("jsVolume");
    

const registerView = () =>{
    const videoId = window.location.href.split("/videos/")[1]
    fetch(`/api/${videoId}/view`, {method:"POST"})
}
    //여기서 method를 post로 쓰는 이유는
    //database를 변경해야하면 getRequest를쓰고
    //database를 변경할 필요없으면 postRequest 쓴다


    function handlePlayClick(){
        if(videoPlayer.paused){
            videoPlayer.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>'
        }else{
            //정지상태가 아니면
            videoPlayer.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>'
        }
    }

    function handleVolumeClick(){
        if(videoPlayer.muted){
            videoPlayer.muted = false;
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            //원래 비디오의 볼륨값을 가져온다
            volumeRange.value = videoPlayer.volume;
        }else{
            videoPlayer.muted = true;
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            volumeRange.value = 0;
        }
    }

    function exitFullScreen(){
       fullScrBtn.innerHTML = '<i class="fas fa-expand"></i>';
       fullScrBtn.addEventListener("click", goFullScreen);
       if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

   function goFullScreen(){
       //지금 풀스크린인지 아닌지 알수 있는 property가 없다
       //그렇기 때문에 eventListener를 변경하고 제거해주는 방식으로 처리할 예정
       if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
      }
       fullScrBtn.innerHTML = '<i class="fas fa-compress"></i>';
       fullScrBtn.removeEventListener("click", goFullScreen);
       fullScrBtn.addEventListener("click", exitFullScreen);
   }

   const formatDate = (seconds) => {
       //parseInt는 문자열인수를 정수로 반환한다
       const secondsNumber = parseInt(seconds, 10);
       //Math.floor()함수는 주어진 숫자보다 작거나 같은 가장 큰 정수를 반환합니다.
       //소수점 때고 앞에 정수값만 가져온다
       let hours = Math.floor(secondsNumber / 3600);
       let min = Math.floor((secondsNumber - hours * 3600) / 60);
       let totalSeconds = (secondsNumber - hours * 3600)- (min * 60);

       if(hours < 10){
           hours = `0${hours}`
       }

       if(min < 10) {
           min = `0${min}`
       }

       if(totalSeconds < 10){
        totalSeconds = `0${totalSeconds}`
       }
       return `${hours}:${min}:${totalSeconds}`;
   };

   //현재 재생시간을 가져온다
   function getCurrentTime(){
       //HTMLMediaElement.currentTime 미디어 초기 재생시간
       currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
   }

   //비디오전체시간을 표시한다
   function setTotalTime(){
       console.log(videoPlayer.duration)
       //mediaSource duration 미디어의 지속시간을 가져오고 설정한다
       const totalTimeString = formatDate(videoPlayer.duration);
       totalTime.innerHTML = totalTimeString;
       //1초 마다 실행
       setInterval(getCurrentTime, 1000);
   }

   //영상 재생이 다끝났을때
   function handleEnded(){
       registerView();
       videoPlayer.currentTime = 0;
       playBtn.innerHTML = '<i class="fas fa-play"></i>';
   }

   function handleDrag(e){
    //input range 움직일떄 value 값을 받아온다
    const {
        target:{value}
    } = e;
    // HTMLMediaElement.volume property 
    videoPlayer.volume = value;
    if(value >= 0.5){
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }else if(value >= 0.2){
        volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    }else{
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
    }

   }
   
    function init(){
        videoPlayer.volume = 0.5;
        playBtn.addEventListener("click", handlePlayClick);
        volumeBtn.addEventListener("click", handleVolumeClick);
        fullScrBtn.addEventListener("click", goFullScreen);
        //video가 metadata를 로드 할 때까지 기다려야한다
        videoPlayer.addEventListener("loadedmetadata", setTotalTime);
        //재생이 끝났을때 시간을 다시 처음으로 설정할것
        videoPlayer.addEventListener("ended", handleEnded);
        volumeRange.addEventListener("input", handleDrag);
    }

    //# jsVideoPlayer가 있다면
    //모든 것들은 videoContainer가 없으면 다 의미없음 
    if(videoContainer){
        init();
    }
