import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { getData } from "@/context/UserContext";
import axios from "axios";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, setUser } = getData();
  const navigate = useNavigate();
  useEffect(() => {
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
    
  }, [navigate, setUser]);
  return (
    <div>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
