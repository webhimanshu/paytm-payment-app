import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const [amount , setAmount] = useState('');
    const id = searchParams.get('id');
    const firstName = searchParams.get('firstName');
    const lastName = searchParams.get('lastName');
    const location = useLocation();
    const navigate = useNavigate();
    const cameFromDashboard = location.state?.fromDashboard;


    const handleSendMoney = async ()=>{
        try {
            const resp =   await axios.post('http://localhost:3000/api/v1/account/transfer', {to:id,amount:amount}, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'), 
                }
              }
            )
            const data = resp.data;
            console.log("🚀 ~ handleSendMoney ~ data:", data);
            navigate('/dashboard');
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
        if(!cameFromDashboard){
            navigate('/dashboard');
           return;
      }
    },[cameFromDashboard])

  return    (
   cameFromDashboard &&  <div className="flex justify-center h-screen bg-gray-100 overflow-hidden">
    <div className="h-full flex flex-col justify-center">
        <div
            className="border h-min text-card-foreground max-w-md px-4 py-6 space-y-8 w-96 bg-white shadow-lg rounded-lg"
        >
            <div className="flex flex-col space-y-1.5 mb-10">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
            </div>
            <div className="px-6">
            <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">{firstName[0]}</span>
                </div>
                
                <h3 className="text-2xl font-semibold ">{firstName +" " +lastName} </h3>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="amount"
                >
                    Amount (in Rs)
                </label>
                <input
                    type="number"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    id="amount"
                    placeholder="Enter amount"
                    onChange={(e)=>setAmount(e.target.value)}
                />
                </div>
                <button className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white" onClick={handleSendMoney}>
                    Initiate Transfer
                </button>
            </div>
            </div>
    </div>
  </div>
</div>

  ) 
}

export default SendMoney