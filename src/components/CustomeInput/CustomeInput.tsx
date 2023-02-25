import React from 'react'
import "./CustomeInput.styles.scss"

interface Props {
  placeholder : string ,
  type : string ,
  value : string ,
  name : string ,
  handleChangeInput : ( e: React.ChangeEvent<HTMLInputElement> ) => void ,
}

const CustomeInput = ( { placeholder , type , value , name , handleChangeInput } : Props ) => {
  return (
    <input
    onChange={ (e) => { handleChangeInput(e) }} 
    className='customeInput'
    value={value} 
    type={type} 
    placeholder={placeholder} 
    name={name}
    />
  )
}

export default CustomeInput