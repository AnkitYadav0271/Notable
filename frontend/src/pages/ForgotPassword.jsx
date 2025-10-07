import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { getData } from "@/context/UserContext";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { CheckCircle, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:6969/user/forgot-password`,
        { email }
      );
      if (res.data.success) {
        navigate(`/verify-otp/${email}`);
        toast.success(res.data?.message);
        setEmail("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative w-full h-[760px] bg-green-100 overflow-hidden ">
      <div className="min-h-screen flex flex-col ">
        {/* main content  */}
        <div className="flex flex-1 items-center justify-center p-4 ">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <h1 className="font-bold text-3xl tracking-tight text-green-600 ">
                Reset your password
              </h1>
              <p className="text-muted-foreground">
                Enter your email and we will sent you instructions to reset your
                password
              </p>
            </div>
            <Card className={"bg-white"}>
              <CardHeader className={"space-y-1"}>
                <CardTitle className={"text-2xl text-center text-green-600"}>
                  Forgot Password
                </CardTitle>
                <CardDescription className={"text-center"}>
                  {isSubmitted
                    ? "Check your email for reset instruction"
                    : "Enter your email address to receive a password reset link"}
                </CardDescription>
              </CardHeader>

              <CardContent className={"space-y-4 "}>
                {error && (
                  <Alert variant={"destructive"}>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {isSubmitted ? (
                  <div className="py-6 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="bg-primary/10 rounded-full p-3 ">
                      <CheckCircle className="h-6 w-6 text-primary "></CheckCircle>
                    </div>
                    <div className="space-y-2 ">
                      <h3 className="font-medium text-lg">Check your inbox</h3>
                      <p className=" text-muted-foreground">
                        We have sent password to{" "}
                        <span className="font-medium text-foreground">
                          {email}
                        </span>
                      </p>
                      <p>
                        If you do not see the email check your spam folder or{" "}
                        <button
                          className="text-primary hover:underline font-medium"
                          onClick={() => setIsSubmitted(false)}
                        >
                          try again{" "}
                        </button>
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-6">
                    <div className="space-y-2 relative text-gray-100">
                      <Label className="text-foreground">Email</Label>
                      <Input
                        type={"email"}
                        name="email"
                        placeholder={"Enter your email "}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        required
                      ></Input>
                    </div>
                    <Button
                      className={
                        "w-full bg-green-600 text-white relative hover:bg-green-500 cursor-pointer"
                      }
                      type = "submit"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        "Send Reset link"
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
              <CardFooter className={"flex justify-center items-center"}>
                <p>
                  Remember your password :
                  <Link
                    to={"/login"}
                    className="text-green-600 hover:underline font-medium relative"
                  >
                    Login
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
