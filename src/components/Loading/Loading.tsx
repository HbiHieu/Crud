import React from 'react'
import "./Loading.styles.scss" ;

const Loading = () => {
  return (
     <div style={{height:'100vh' , display:'flex' , justifyContent:'center' , alignItems:'center' ,}}>
      <span className='loaderCircle'></span>
      <span className='loaderCircle delay-1'></span>
      <span className='loaderCircle delay-2'></span>
     </div>
  )
}

export default Loading