import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Verify() {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.post(
          `http://localhost:6969/user/verify`,
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res);
        if (res.data.success) {
          setStatus("✅ Email verified successfully");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setStatus("❌ Invalid or Expired token");
        }
      } catch (error) {
        console.log(error);
        setStatus("❌ verification failed please try again");
      }
    };

    verifyEmail();
  }, [token, navigate]);
  return (
    <div className="relative w-full bg-green-100 overflow-hidden h-[760px]">
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-white p-6 rounded-xl shadow-xl text-center w-[90%] max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 ">{status}</h2>
        </div>
      </div>
    </div>
  );
}

export default Verify;
