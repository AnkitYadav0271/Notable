import { getData, UserProvider } from "@/context/UserContext";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddNote from "./AddNote";

function UserHome() {
  const { user, setUser } = getData();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!user){
        const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:6969/user/", {
          withCredentials: true,
        });
        console.log(res);
        setUser(res.data.user);
      } catch (error) {
        console.log("caught error");
         navigate("/login");
      }
    };

    fetchUser();
    }
  },[user])
  
  return (
    
      <div className="min-h-screen bg-green-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          {/* Heading Section - Left aligned */}
         

          <AddNote/>

          
        </div>
      </div>

  );
}

export default UserHome;
