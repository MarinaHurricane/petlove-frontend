import css from "./LoginForm.module.css";
import { useForm, useWatch } from "react-hook-form";
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
  // const [value, setValue] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onChange",
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

  const email = useWatch({
    control,
    name: "email",
  });

  const password = useWatch({
    control,
    name: "password",
  });

  return (
    <form className={css.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.formFields}>
        <div className={css.emailPassword}>
          <input
            type="text"
            placeholder="Email"
            className={` ${css.field} ${errors.email && css.errorField} ${dirtyFields.email && email && !errors.email && css.check} `}
            {...register("email")}
          />
          {errors.email ? (
            <button
              type="button"
              className={css.clearButton}
              onClick={() => setValue("email", "")}
            >
              <Icon name="icon-x" className={css.icon} />
            </button>
          ) : (
            dirtyFields.email &&
            email &&
            !errors.email && (
              <Icon name="icon-check" className={css.iconCheck} />
            )
          )}

          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>

        <div className={css.emailPassword}>
          <input
            type="password"
            placeholder="Password"
            className={`${css.field} ${errors.password && css.errorField} ${dirtyFields.password && password && !errors.email && !errors.password && css.check}`}
            {...register("password")}
          />
          <Icon name="icon-eye-off" className={css.iconCheck} />
          {errors.password ? (
            <p className={css.error}>{errors.password.message}</p>
          ) : (
            dirtyFields.password &&
            !errors.password &&
            password && (
              <>
                <p className={css.passwordCorrect}>Password is secure</p>{" "}
                <Icon name="icon-check" className={css.iconPasswordCheck} />
              </>
            )
          )}
        </div>
      </div>

      {error && <p className={css.error}>{error}</p>}

      <Button type="submit" className={css.button}>
        LOG IN
      </Button>
    </form>
  );
};
