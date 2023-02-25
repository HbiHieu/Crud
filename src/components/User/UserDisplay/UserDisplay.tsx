import React from 'react'
import { IUser } from '../../../interface'
import Avatar from 'react-avatar'

interface Props {
  user : IUser
}

const UserDisplay = ( { user } : Props ) => {
  return (
    <div style={{display:'flex'}}>
      <Avatar name={user.name} size={'40px'} round={'50%'}/>
      <div style={{height:'40px' , padding:'4px' , fontSize:'12px', marginLeft:'5px'}}>
        <p style={{fontWeight:'bold'}}>{user.name}</p>
        <p style={{color:'gray'}}>{user.email}</p>
      </div>
    </div>
  )
}

export default UserDisplay