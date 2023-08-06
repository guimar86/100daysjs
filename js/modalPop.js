"use strict";

let modal=document.querySelector(".modal");
let overlay=document.querySelector(".overlay");
let closeModalBtn=document.querySelector("#modalCloseBtn");
let openModalBtn=document.querySelector("#openModal");


const openModal=function(){

    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");

};

const closeModal=function(){
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

closeModalBtn.addEventListener("click",closeModal);
openModalBtn.addEventListener("click",openModal);
overlay.addEventListener("click",closeModal);
document.addEventListener("keyup",function(e){

    if(e.key==="Escape" && !modal.classList.contains("hidden")){

        closeModal();
    }
})