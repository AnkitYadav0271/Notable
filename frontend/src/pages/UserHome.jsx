import { getData, UserProvider } from "@/context/UserContext";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-green-600">
              Hello {user?.username}
            </h1>
            <p className="text-gray-600">
              All of your thoughts and ideas are organized here
            </p>
          </div>

          
        </div>
      </div>

  );
}

export default UserHome;
