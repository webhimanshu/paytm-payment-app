import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const [user , setUser] = useState({});
    const [show , setShow] = useState(false);
    const navigate = useNavigate();
    const getUserDetails = async ()=>{
        try {
            const response = await axios.get("http://localhost:3000/api/v1/user/detail" ,{headers:{
                "Authorization" :localStorage.getItem('token')
            }});
            const data = response.data;
            setUser(data);
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
        getUserDetails();
    },[])

  return (
    <div className="shadow h-14 flex justify-between items-center">
    <div className="flex flex-col justify-center h-full ml-4 font-medium">
        PayTM App
    </div>
    <div className="flex items-center">
        <div className="flex flex-col justify-center h-full mr-4 font-medium">
            Hello
        </div>
        <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center mt-1 mr-2 relative">
            <div className="flex flex-col justify-center h-full text-lg cursor-pointer" onClick={()=>setShow(!show)}>
            {user.firstName &&  user.firstName[0]}
            </div>

            {show && <div className="w-[100px] py-2 px-2 bg-slate-200 border absolute top-[46px] right-0 rounded-lg cursor-pointer" onClick={()=>{
                localStorage.removeItem("token");
                navigate('/signin');
            }}>
                 Logout
            </div>}
        </div>
    </div>
</div>
  )
}

export default Navbar