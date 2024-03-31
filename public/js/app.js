// const { response } = require("express");



const wetherform = document.querySelector('form')
const serch= document.querySelector('input')
const msgone =document.querySelector('#msg-one')
 
const msgtwo =document.querySelector('#msg-two')


wetherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location =serch.value
    // console.log("clicked",location)
    msgone.textContent ="loading.."
    msgtwo.textContent=null
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msgone.textContent =data.error
            msgtwo.textContent=null
        }else{
            console.log("lllllllll",data)
            msgone.textContent =data.city
            msgtwo.textContent =data.weather.op
            console.log("location",data.city)
            console.log("forcast",data.weather.op)
        }
    })
})
})