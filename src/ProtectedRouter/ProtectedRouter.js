import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRouter = ({auth, children}) => {
    
  return auth === null ? <h1>Loading.....</h1> : auth === true ? children : <Navigate to={'/login'} />
}

export default ProtectedRouter;
