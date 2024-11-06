import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import { login as authLogin } from "../../store/authSlice";
import {Button, Input, Logo} from "./index"
import authService from "../../appwrite/auth";
import { UseDispatch, useDispatch } from "react-redux";
import {useForm} from "react-hook-form"

export default function Login(){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if(session){
                const useData = await authService.getCurrentUser()
                if(useData) useDispatch(authLogin)
                navigate("/")
            }
        } catch (error) {
            setError(error)
        }
    }

    return (
        <div className="flex items-center justify-center w-full">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%"/>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don't have an any account?&nbsp;<Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline"/>
                </p>
                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit(login)}
                className="mt-8">
                    <div className="space-y-5">
                        <Input 
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) || "Email address must be a valid address"
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
                        >Login</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}