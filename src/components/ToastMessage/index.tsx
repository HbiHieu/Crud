import React from "react"
import { createRoot , Root } from "react-dom/client"
import MessageBox from "./MessageBox";
import { createMessageFunc } from "./type";

export const createContainer = () => {
    let messageWraper = document.querySelector("#messageWrapper") ;
    if ( !messageWraper ) {
        messageWraper = document.createElement('div') ;
        messageWraper.id = 'messageWrapper' ;
        document.body.appendChild(messageWraper) ;
    }
    let container = document.createElement('div') ;
    container.id = 'messageContainer' ;
    messageWraper.appendChild(container) ;
    return container ;
}

const createMessage:createMessageFunc = (type,message) => {
    const container = createContainer() ;
    const root = createRoot(container) ;
    root.render(<MessageBox type={type} message={message}/>) ;
    let count = document.querySelectorAll(".messageBox").length 
    setTimeout( ()=> {
       container.classList.add("remove") ;
       const timeDelay = count * 0.2 ;
       container.style.animationDelay = `${timeDelay}s` ;
       setTimeout ( ()=> {
        root.unmount() ;
        container.remove() ;
       } , 400
       + timeDelay * 1000
       )
    } , 2000 )
}

export const infoMessage = ( message : string ) => {
    createMessage("Info",message) ;
}

export const successMessage = ( message : string ) => {
    createMessage("Success",message) ;
}

export const warningMessage = ( message : string ) => {
    createMessage("Warning",message) ;
}

export const errorMessage = ( message : string ) => {
    createMessage("Error",message) ;
}