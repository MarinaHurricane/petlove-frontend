import css from "./RegisterForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../Button/Button";
import { registerUser } from "../../lib/api/auth";
import { useAuthStore } from "../../lib/store/authStore";
import { useNavigate } from "react-router-dom";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  name: yup.string().required("Name is required"),

  email: yup
    .string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const RegisterForm = () => {
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
    mutationFn: registerUser,
    onSuccess: (data) => {
      setUser(data);
      reset();
      console.log(data);
      navigate("/profile");
    },
    onError: () => {
      alert("Registration failed, please try again");
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    const { confirmPassword, ...userData } = data;
    console.log(userData);
    mutation.mutate(userData);
    console.log("user registered");
  };

  return (
    <form className={css.regiserForm} onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Name" {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <input type="text" placeholder="Email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="text" placeholder="Password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <input
        type="text"
        placeholder="Confirm password"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <Button type="submit">Registration</Button>
    </form>
  );
};
