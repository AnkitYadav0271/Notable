import { BookA, BookOpen, LogOut, User } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getData } from "@/context/UserContext";
import axios from "axios";
import { toast } from "sonner";

function Navbar() {
  const { user, setUser } = getData();
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const res = await axios.post(
      `http://localhost:6969/user/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (res.data.success) {
      setUser(null);
      toast.success(res.data.message);
      navigate("/login");
      localStorage.clear();
    }
  };
  return (
    <nav className="p-2 border border-gray-200 bg-transparent">
      <div className="flex max-w-7xl mx-auto justify-around items-center ">
        {/* logo section  */}
        <div className="flex gap-2 items-center">
          <BookOpen className="h-6 w-6 text-green-600" />
          <h1 className="font-bold text-xl">
            <Link to={"/"}>
              {" "}
              <span className="text-green-600">Notable</span>
            </Link>
          </h1>
        </div>

        <div className="flex gap-7 items-center">
          <ul className="flex gap-7 items-center text-lg font-semibold">
            <li>Features</li>
            <li>Pricing</li>
            <li>About</li>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BookA /> Notes
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logoutHandler}>
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                className="bg-green-600 rounded-xl p-2  w-full text-white"
                to={"/login"}
              >
                Signin
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
