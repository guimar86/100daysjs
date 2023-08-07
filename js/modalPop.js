"use strict";

let modal=document.querySelector(".modal");
let overlay=document.querySelector(".overlay");
let closeModalBtn=document.querySelector("#modalCloseBtn");
let openModalBtn=document.querySelector("#openModal");


/**
 * The openModal function removes the "hidden" class from the modal and overlay elements.
 */
const openModal=function(){

    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");

};

/**
 * The closeModal function adds the "hidden" class to both the modal and overlay elements.
 */
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