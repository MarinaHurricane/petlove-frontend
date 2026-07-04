import css from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../Button/Button";
import { loginUser } from "../../lib/api/auth";
import { useAuthStore } from "../../lib/store/authStore";
import { useNavigate } from "react-router-dom";

type LoginFormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
});

export const LoginForm = () => {
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data);
      console.log(setUser);
      reset();
      navigate("/profile");
    },
    onError: () => {
      setError("Log in failed, check your details and try again");
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutation.mutate(data);
    console.log("user logged in");
  };

  return (
    <form className={css.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="text" placeholder="Password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      {error && <p className={css.error}>{error}</p>}

      <Button type="submit">LOG IN</Button>
    </form>
  );
};
