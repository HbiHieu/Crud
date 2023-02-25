import React from 'react'
import "./Button.styles.scss" ;

interface Props {
  children : React.ReactNode ,
  handleClickBtn ?: () => void ,
  disabled ?: boolean ,
}

const Button = ( { children , handleClickBtn , disabled } : Props) => {
  return (
    <button disabled={disabled} className='buttonHeader' onClick={handleClickBtn}>{children}</button>
  )
}

export default Button