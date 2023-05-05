"use strict";
let k= ``;

const eventName= document.getElementById("eventName");
const eventDate= document.getElementById("eventDate");
const buttonAdd= document.getElementById("bAdd");
const eventContainer= document.querySelector(".eventsContainer");


const save= data=>{
    localStorage.setItem("item",data);
}

const load = data=>{
    return localStorage.getItem("item",data);
}

const dateDiff = d =>{
    const targetDay= new Date(d);
    const today= new Date();
    const diference= targetDay.getTime()- today.getTime()    //getTime devuleve la fecha en numeros
    const days= Math.ceil(diference / (1000*3600*24));
    return days;
}


const renderEvents= ()=>{
    const eventsHTML= event.map(event=>{
        return `
        <div class="event">
            <div class="days">
                <span class="days-number">${dateDiff(event.date)}</span>
                <span class="days-text">Days</span>
            </div>
            <div class="event-name">${event.name}</div>
            <div class="event-Date">${event.date}</div>
            <div class="actions">
                <button class="bDelete" data-id="${event.id}">Delete Event</button>
            </div>
        </div>
        `;
    });
    eventContainer.innerHTML = eventsHTML.join("");
    document.querySelectorAll(".bDelete").forEach(button=>{
        button.addEventListener("click",e=>{
            const id = button.getAttribute("data-id");

            event = event.filter(event=>event.id !=id);
            save(JSON.stringify(event));
            renderEvents();
            })
        })
    }   

let event= [];
let arr= []; //cargar info. y desp cargarla a event;


const json= load();

try {
    arr= JSON.parse(json);
} catch (error) {
    console.log(error);
    arr=[];
}

event=arr? [...arr] : [];

renderEvents();

document.querySelector(".formm").addEventListener("submit", e=>{
    e.preventDefault();
    addEvent();
})


const addEvent= ()=>{
    if(eventName.value == ""||eventDate=="") return;
    if(dateDiff(eventDate.value)<0) return;
    const newEvent= {
        id: (Math.round(Math.random()*100)),
        name: eventName.value,
        date : eventDate.value
    }

    event.unshift(newEvent);  //agrega un elemento al inicio del arreglo;
    
    save(JSON.stringify(event));

    eventName.value="";
    renderEvents()
}




localStorage.setItem(0,{id:0, noombre:"nicolas"})