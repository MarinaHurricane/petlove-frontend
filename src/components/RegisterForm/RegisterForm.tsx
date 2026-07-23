import css from "./RegisterForm.module.css";
import { useForm, useWatch } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../Button/Button";
import { registerUser } from "../../lib/api/auth";
import { useAuthStore } from "../../lib/store/authStore";
import { useNavigate } from "react-router-dom";
import { Icon } from "../Icon/Icon";
import { FeauturedPetCard } from "../FeaturedPetCard/FeaturedPetCard";
import { getRandomPet } from "../../lib/api/petsPage";
import catImage from "../../assets/cat.png";

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
    control,
    setValue,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onChange",
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

     const name = useWatch({
      control,
      name: "name",
    });

    const email = useWatch({
      control,
      name: "email",
    });
  
    const password = useWatch({
      control,
      name: "password",
    });

       const confirmPassword = useWatch({
      control,
      name: "password",
    });

  return (
    <>
    <form className={css.regiserForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.formFields}>
      <input type="text" placeholder="Name" 
      className={` ${css.field} ${errors.email && css.errorField} ${dirtyFields.name && name && !errors.name && css.check} `}
      {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

       <div className={css.emailPassword}>
              <input
                type="email"
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


     <div className={css.emailPassword}>
          <input
            type="password"
            placeholder="Confirm Password"
            className={`${css.field} ${errors.confirmPassword && css.errorField} ${dirtyFields.confirmPassword && confirmPassword && !errors.email && !errors.confirmPassword && css.check}`}
            {...register("confirmPassword")}
          />
          <Icon name="icon-eye-off" className={css.iconCheck} />
          {errors.confirmPassword ? (
            <p className={css.error}>{errors.confirmPassword.message}</p>
          ) : (
            dirtyFields.confirmPassword &&
            !errors.confirmPassword &&
            confirmPassword && (
              <>
                <p className={css.passwordCorrect}>Password is secure</p>{" "}
                <Icon name="icon-check" className={css.iconPasswordCheck} />
              </>
            )
          )}
        </div>
      </div>

      <Button type="submit">Registration</Button>
    </form>


    </>
  );
};
