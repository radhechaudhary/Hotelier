import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { setLoggedIn} from './features/data.Slice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Protected() {
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const [isAunthenticatd, setIsAuthenticated]= useState();
    useEffect(()=>{
        axios.post('http://localhost:4000/verify-user', {},{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        } )
        .then((res)=>{
            console.log(res.data.message)
            if(res.data.message==='success'){
                setIsAuthenticated(true);
            }
            else{
                dispatch(setLoggedIn(false));
                localStorage.removeItem('token');
                localStorage.removeItem('userId')
                localStorage.removeItem('rooms')
                localStorage.removeItem('currentCustomers')
                localStorage.removeItem('staff')
                localStorage.removeItem('hotel')
                localStorage.removeItem('occupiedRooms')
                navigate('/')
            }
        })
        .catch((err)=>{
            console.log(err.message)
        })
    },[])
  return (
    <>
    {isAunthenticatd?<Outlet/>:null}
    </>
    
  )
}

export default Protected