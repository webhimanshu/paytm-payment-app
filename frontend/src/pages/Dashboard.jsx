import Balance from '../components/Balance.jsx'
import Navbar from '../components/Navbar.jsx'
// import { Users } from '../components/Users.jsx'

const Dashboard = () => {
  return (
    <>
     <Navbar/>
     <div className='px-10 pt-4'>
       <Balance value={5000}/>
     {/* <Users/> */}
     </div>

    </>
  )
}

export default Dashboard