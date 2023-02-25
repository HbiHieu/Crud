import React , { useState , useEffect } from 'react' 
import { Root } from "react-dom/client" 
import { getConfirmIcons } from './icons'
import { ConfirmBoxAction, ConfirmBoxType } from './type'

interface Props {
    type : ConfirmBoxType,
    action : ConfirmBoxAction ,
    root : Root ,
    container : HTMLDivElement ,
}

const ConfirmBox = ( { type , action , root , container }:Props ) => {
  
  const [visible,setVisible] = useState(true) ;
  const { message , yes , no } = action ;

  const close = () => {
    container.remove() ;
    root.unmount() ;
  }

  const handleOk = () => {
    yes() ;
    close() ;
  }

  const handleCancel = () => {
     close() ;
  }

  useEffect( () => {
    const handleClickOutside = ( e : MouseEvent ) => {
      const target = e.target as HTMLElement;
      if ( target.classList.contains("confirmbox") || target.closest(".confirmbox") ) {
        return ;
      }
      close() ;
    }
    container.addEventListener("click" , (e) => { handleClickOutside(e) } ) ;
    return () => {
      container.removeEventListener("click" , (e) => { handleClickOutside(e) } ) ;
    }
  }  )

  return (
    <div className={`confirmbox ${type} ${visible ? "" : "hidden"}`} >
    {getConfirmIcons(type)}
    <p>{message}</p>
    <div className="confirmboxButton">
      <button className="" onClick={handleOk}>Ok</button>
      <button className="" onClick={handleCancel}>Cancel</button>
    </div>
  </div>
  )
}

export default ConfirmBox