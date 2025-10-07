import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import React, { useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  newPassword: "",
  confirmPassword: "",
};

const ForgotPasswordReducer = (state, action) => {
  switch (action.type) {
    case "change-password": {
      return { ...state, [action.fieldName]: action.payload };
    }
    default:
      return state;
  }
};

function ChangePassword() {
  const { email } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useReducer(ForgotPasswordReducer, initialState);
  const navigate = useNavigate();
  const [showPassword,setShowPassword] = useState(false)

  const handleChangeForgotPassword = (e) => {
    dispatch({
      type: "change-password",
      fieldName: e.target.name,
      payload: e.target.value,
    });
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    console.log(state);

    if (!state.newPassword || !state.confirmPassword) {
      setError("All the field are required");
      return;
    }

    if (state.newPassword != state.confirmPassword) {
      setError("Confirm Password do not match");
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:6969/user/change-password/${email}`,
        { newPassword: state.newPassword, confirmPassword: state.newPassword }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setError("");
        navigate("/login");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong please try again"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white shadow-lg w-full rounded-lg p-5 max-w-md ">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Change Password{" "}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Set a new password for <span className="font-semibold">{email}</span>
        </p>

        {error && (
          <p className="text-sm text-red-500 mb-3 text-center">{error}</p>
        )}

        {success && (
          <p className="text-sm text-green-600 mb-3 text-center">{success}</p>
        )}

        <div className="space-y-6">
          <div className="relative">
            <Input
              type={showPassword ? "text":"password"}
              placeholder={"New Password"}
              name="newPassword"
              value={state.newPassword}
              onChange={handleChangeForgotPassword}
            />

            <Button
              type={"button"}
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

          <div className="relative">
            <Input
              type={showPassword ? "text" :"password"}
              placeholder={"Confirm Password"}
              name="confirmPassword"
              value={state.confirmPassword}
              onChange={handleChangeForgotPassword}
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

          <Button
            className="w-full bg-green-600 hover:bg-green-500"
            disabled={isLoading}
            onClick={handleForgotPasswordSubmit}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" /> changing
              </>
            ) : (
              "Change Password"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
