import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRouter = ({isAuth, children}) => {
    
  return isAuth === null ? <h1>Loading.....</h1> : isAuth === true ? children : <Navigate to={'/login'} />
}

export default ProtectedRouter;
