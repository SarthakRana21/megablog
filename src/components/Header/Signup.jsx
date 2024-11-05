import React, { useState } from "react";
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

}