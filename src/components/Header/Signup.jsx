import React, { isValidElement, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { login as authLogin } from "../../store/authSlice";

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [register, handleSubmit] = useForm();
    const [error, setError] = useState("");

    const signup = async (data) => {
        setError("")
        try {
            const session = await authService.createAccount(data);
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData) useDispatch(authLogin(userData))
                navigate("/");
            }
        } catch (error) {
            setError(error);
        }

    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%"/>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;<Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline"/>
                </p>
                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signup)}
                className="mt-8">
                    <div className="space-y-5">
                        <Input 
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            register: true,
                            validate: {
                                matchPatern: (value) => {
                                    /[^a-zA-Z\x20]/g.test(value) || "Name must be a valid name"
                                }
                            }
                        })}
                        />
                        <Input 
                        label="Password:"
                        placeholder="Enter you password"
                        type="password"
                        {...register("password", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value) || "Password must be a valid password"
                            }
                        })}
                        />
                        <Button
                        type="submit" 
                        className="w-full"
                        >Sign Up</Button>
                    </div>
                </form>
            </div>
        </div>
    )

}