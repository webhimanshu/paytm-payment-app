import { useEffect, useState } from 'react'
import Balance from '../components/Balance.jsx'
import Navbar from '../components/Navbar.jsx'
import { Users } from '../components/Users.jsx'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const [inputValue , setInputValue] = useState('');
  const [balance , setBalance] = useState('')
  const [users , setUsers] = useState([]);
 const navigate =  useNavigate();

  const getAllUsers = async () =>{
    try {
      const resp = await  axios.get("/api/v1/user/bulk?filter="+inputValue ,{
        headers :{
          'Authorization'  : localStorage.getItem('token')
        }
      });
       
        
      const data = resp.data;
      setUsers(data)
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log("Server responded with status code:", error.response.status);
        console.log("Response data:", error.response.data);
        if(error.response.status === 403){
          localStorage.removeItem('token');
          navigate('/signin');
       }
    } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received:", error.request);
    } else {
        // Something happened in setting up the request that triggered an error
        console.log("Error:", error.message);
    }
    }

  };

  const getUserBalance = async() =>{
    try {
      const resp = await axios.get('/api/v1/account/balance',{
        headers :{
          'Authorization' :localStorage.getItem('token'),
        }
       });
       const data  = resp.data; 
       setBalance(data.balance);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log("Server responded with status code:", error.response.status);
        console.log("Response data:", error.response.data);
    } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received:", error.request);
    } else {
        // Something happened in setting up the request that triggered an error
        console.log("Error:", error.message);
    }
    }


  }
  useEffect(()=>{
    getAllUsers();
    getUserBalance();
  },[inputValue]);

  return (
    <>
     <Navbar/>
     <div className='px-2 md:px-10 pt-4'>
       <Balance value={balance}/>
      <Users inputValue={inputValue} setInputValue={setInputValue} users={users}/>
     </div>

    </>
  )
}

export default Dashboard