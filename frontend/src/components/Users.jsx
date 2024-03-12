import { useState } from "react"
import  Button  from "./Button.jsx"
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
export const Users = ({inputValue , setInputValue , users}) => {
    
    // Replace with backend call
    
    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"/>
        </div>
        <div>
            {users.length > 0 ? users?.map(user => <User user={user} key={user._id} id={user._id}/>) : <h1> Not Found</h1>}
        </div>
    </>
}

function User({user , id}) {
    const navigate = useNavigate();
    const location = useLocation();
    return <div className="flex justify-between mb-1.5">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={()=>navigate('/send?id='+id+'&firstName='+user?.firstName+'&lastName='+user?.lastName , {state: { fromDashboard: true ,prevUrl : location.pathname}})}label={"Send Money"} />
        </div>
    </div>
}