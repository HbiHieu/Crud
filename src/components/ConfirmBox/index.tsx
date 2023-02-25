import { createRoot } from "react-dom/client"
import ConfirmBox from "./ConfirmBox";
import { conFirmBoxFunc, createConfirmFunc } from "./type"

const createContainer = () => {
    let container = document.createElement("div") ;
    container.id = "confirmBoxContainer" ;
    document.body.appendChild(container) ;
    return container ;
}

const createConfirm:createConfirmFunc = ( type , action ) => {
    const container = createContainer() ;
    const root = createRoot(container) ;
    root.render(<ConfirmBox type={type} action={action} root={root} container={container}/>) ;
}

export const alertConfirmBox:conFirmBoxFunc = ( action ) => {
  createConfirm("alert",action) ;
}

export const warningConfirmBox:conFirmBoxFunc = ( action ) => {
  createConfirm("warning",action) ;
}