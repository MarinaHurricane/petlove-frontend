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
import { Icon } from "../Icon/Icon";


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
  const [value, setValue] = useState("");
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

      const handleClear = (e) => {
        setValue('');
        // onSearch('');
        e.target.value = '';
    }

  return (
    <form className={css.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.formFields}>
        <div className={css.emailPassword}>

      <input type="text" placeholder="Email" className={errors.email ? css.errorField : css.field} {...register("email")} />
      {errors.email && <button type="button" className={css.clearButton} onClick={handleClear}>
         <Icon name="icon-x" className={css.icon}/></button>}
      
      {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </div>

      <div className={css.emailPassword}>

      <input type="text" placeholder="Password" className={errors.password ? css.errorField : css.field} {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}
      </div>
      </div>

      {error && <p className={css.error}>{error}</p>}

      <Button type="submit" className={css.button}>LOG IN</Button>
    </form>
  );
};
