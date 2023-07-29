"use strict";

let colorInputTxt=document.querySelector("#colorTxt");
let colorChangeBtn=document.querySelector("#changeColorBtn");

colorChangeBtn.addEventListener("click",function(){

    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    colorInputTxt.value=randomColor;
    document.querySelector("body").style.backgroundColor="#"+randomColor;
});