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
import axios from "axios";
import { CheckCircle, Loader2, RotateCcw } from "lucide-react";
import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function VerifyOtp() {
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const { email } = useParams();
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length != 6) {
      setError("Please Enter 6 digits");
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:6969/user/verify-otp/${email}`,
        { otp: finalOtp }
      );
      setSuccessMsg(res.data.message);
      setTimeout(() => {
        navigate(`/change-password/${email}`);
      }, 2000);
    } catch (error) {
      setError(error.response.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const clearOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0].focus();
  };
  return (
    <div className="min-h-screen flex flex-col bg-green-100">
      {/* Main content        */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y">
          <div className="text-center space-y-2">
            <h1 className="text-3xl text-green-600 font-bold tracking-tight">
              Verify your email
            </h1>

            <p className="text-muted-foreground">
              we have sent you 6 digit verification code to{" "}
              <span>{"your email"}</span>
            </p>
          </div>
          <Card className={"shadow-lg"}>
            <CardHeader className={"space-y-1"}>
              <CardTitle className={"text-2xl text-center text-green-600"}>
                Enter verification code
              </CardTitle>
              <CardDescription className={"text-center"}>
                {isVerified
                  ? "code verified redirecting..."
                  : "Enter the six digit code send to your email"}
              </CardDescription>
            </CardHeader>
            <CardContent className={"space-y-6"}>
              {error && (
                <Alert variant={"destructive"}>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {successMsg && (
                <p className="text-green-500 mb-3 text-center">{successMsg}</p>
              )}

              {isVerified ? (
                <div className="py-6 flex flex-col items-center justify-center space-y-4 text-card">
                  <div className="bg-primary/10 rounded-full p-3">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2 ">
                    <h3 className="font-medium text-lg">
                      Verification successFull
                    </h3>
                    <p className="text-muted-foreground">
                      Your email has verified to you will be redirected to reset
                      password
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin"></Loader2>
                    <span className="text-sm text-muted-foreground">
                      Redirecting....
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  {/* otp input  */}
                  <div className="flex justify-between mb-2">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        type={"text"}
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          handleChange(index, e.target.value);
                        }}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className={"h-12 w-12 text-center font-bold "}
                      />
                    ))}
                  </div>

                  {/* Action button  */}

                  <div className="space-y-3">
                    <Button
                      className={
                        "bg-green-600 w-full hover:bg-green-500 cursor-pointer"
                      }
                      disabled={isLoading || otp.some((digit) => digit === "")}
                      onClick={handleVerify}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 w-4 h-4 animate-spin"></Loader2>
                        </>
                      ) : (
                        "Verify Code"
                      )}
                    </Button>

                    <Button
                      variant={"outline"}
                      onClick={clearOtp}
                      className={"w-full bg-transparent cursor-pointer"}
                      disabled={isLoading || isVerified}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Clear
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              <p className="text-sm text-muted-foreground ">
                Wrong Email?{" "}
                <Link
                  to={"/forgot-password"}
                  className="text-green-600 font-medium hover:underline"
                >
                  go back
                </Link>
              </p>
            </CardFooter>

          </Card>

          <div className="text-center text-xs text-muted-foreground ">
            <p className="font-mono text-center text-xs text-muted-foreground">
                for testing purposes use code: <span className="font-mono font-medium">123456</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
