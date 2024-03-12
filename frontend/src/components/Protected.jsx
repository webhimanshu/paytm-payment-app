import { useEffect, useState } from "react";
import { Outlet , Navigate } from "react-router-dom"
const Protected = () => {
    let auth = localStorage.getItem('token');

  return (
     auth ? <Outlet/> : <Navigate to='/signin'/>
  )
}

export default Protected