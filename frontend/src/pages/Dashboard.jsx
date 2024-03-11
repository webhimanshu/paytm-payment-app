import { useEffect, useState } from 'react'
import Balance from '../components/Balance.jsx'
import Navbar from '../components/Navbar.jsx'
import { Users } from '../components/Users.jsx'
import axios from 'axios';
const Dashboard = () => {
  const [inputValue , setInputValue] = useState('');
  const [users , setUsers] = useState([]);

  const getAllUsers = async () =>{
     const resp = await  axios.get("http://localhost:3000/api/v1/user/bulk?filter="+inputValue);
     const data = resp.data;
     setUsers(data)
  };

  useEffect(()=>{
    getAllUsers();
  },[inputValue]);

  return (
    <>
     <Navbar/>
     <div className='px-10 pt-4'>
       <Balance value={5000}/>
      <Users inputValue={inputValue} setInputValue={setInputValue} users={users}/>
     </div>

    </>
  )
}

export default Dashboard