import { getData } from '@/context/UserContext'
import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({children}) {
    const {user} = getData();
  return (
    
    <div>
      {user ? children  : <Navigate to={"/login"}/>}
    </div>
  )
}

export default ProtectedRoutes
