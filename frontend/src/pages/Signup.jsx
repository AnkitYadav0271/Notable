import React, { useReducer, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Flag, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SignupReducer = (state, action) => {
  switch (action.type) {
    case "register": {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const initialState = {
  username: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const [state, dispatch] = useReducer(SignupReducer, initialState);

  const handleChange = (e) =>
    dispatch({
      type: "register",
      fieldName: e.target.name,
      payload: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:6969/user/register`,
        state,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        navigate("/verify");
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status == 400) {
        setErr(error.response.data.message);
      } else {
        setErr("UnExpected error: please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Heading Section - Left aligned */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-green-600">
            Create your account
          </h1>
          <p className="text-gray-600">
            Start organizing your thoughts and ideas today!
          </p>
        </div>

        {/* Card Section */}
        <Card className="w-full">
          <CardHeader className={"space-y-1"}>
            <CardTitle className={"text-2xl text-center text-green-600"}>
              Signup
            </CardTitle>
            <CardDescription className={"text-center"}>
              Signup to get started with Notable.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                {/* Username Field */}
                <div className="grid gap-2">
                  <Label htmlFor="username">Full Name</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Radhey Shyam"
                    value={state.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    value={state.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative ">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={state.password}
                      onChange={handleChange}
                      required
                    />
                    <Button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      variant={"ghost"}
                      className={
                        "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent "
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-600" />
                      )}
                    </Button>
                  </div>
                  <div
                    className={`grid gap-2 ${err == "" ? "hidden" : "block"}`}
                  >
                   <p className="capitalize text-red-600 "> {err ? err : ""} </p>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-500 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"> </Loader2>
                  Creating account...
                </>
              ) : (
                "Signup"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
