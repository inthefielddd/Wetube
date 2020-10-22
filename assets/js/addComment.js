import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");


const increaseNumber = () =>{
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
}
const addComment = (comment) =>{
    const li = document.createElement("li");
    const span = document.createElement("span");
    //input의 value 값
    span.innerHTML = comment;
    li.appendChild(span);
    commentList.prepend(li);
    increaseNumber();


}
const sendComment = async (comment) =>{
    const videoId = window.location.href.split("/videos/")[1]
    const reponse = await axios({
        url:`/api/${videoId}/comment`, 
        method:"POST",
        data:{
            //comment는 text이고, data이름도 comment
            // comment:comment
            comment,
        }
    });
    //댓글이 데이터베이스에 추가되면 그때 comment를 달겠다
    if(reponse.status === 200){
        addComment(comment);
    }
    console.log(reponse);
};

const handleSubmit = (event) => {
    //새로고침 하는 것을 막아준다
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment);
    //보낸 value값은 다시 무로 처리
    commentInput.value = "";
}

function init(){
    addCommentForm.addEventListener("submit", handleSubmit)
}

if(addCommentForm){
    init();
}