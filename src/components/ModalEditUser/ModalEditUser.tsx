import css from "./ModalEditUser.module.css";
import { useAuthStore } from "../../lib/store/authStore";
import { Icon } from "../Icon/Icon";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { editUserAvatar, updateProfile } from "../../lib/api/user";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../Button/Button";

type EditProfileValues = {
  name: string;
  email: string;
  phone?: string;
};

const schema = yup.object({
  name: yup.string(),
  email: yup
    .string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email")
    .required("Email is required"),

  avatar: yup
    .string()
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      "Invalid image format",
    ),

  phone: yup
    .string()
    .notRequired()
    .matches(/^\+44\d{10}$/, {
      message: "Phone must start with + 44 folowed by 10 digits",
      excludeEmptyString: true,
    }),
});

export const ModalEditUser = ({ onClose }) => {
  const { user } = useAuthStore();
  const setUser = useAuthStore((state) => state.setUser);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone || "",
    },
    resolver: yupResolver(schema),
  });

  const avatarMutation = useMutation({
    mutationFn: editUserAvatar,
    onSuccess: (data) => {
      setUser({
        ...user,
        avatar: data,
      });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      setUser(data);
      onClose();
    },
  });

  const onSubmit = (data) => {
    console.log("PROFILE DATA:", data);
    updateProfileMutation.mutate(data);
  };

  const handleAvatarChange = (e) => {
    const avatar = e.target.files?.[0];
    if (!avatar) return;
    try {
      setPreview(URL.createObjectURL(avatar));
      avatarMutation.mutate(avatar);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return null;

  return (
    <div className={css.editWrapper}>
      <p className={css.editParagraph}>Edit information</p>
      <img
        src={preview || user?.avatar}
        alt="user-avatar"
        className={css.avatar}
      />

      <form onSubmit={handleSubmit(onSubmit)} className={css.editProfileForm}>
        <label htmlFor="avatar" className={css.uploadButton}>
          Upload photo
          <span>
            <Icon name="icon-upload-cloud" className={css.icon} />
          </span>
        </label>

        <input
          id="avatar"
          type="file"
          accept="image/*"
          hidden
          onChange={handleAvatarChange}
        />

        <input type="text" {...register("name")} className={css.profileInfo} />
        {errors.name && <p>{errors.name.message}</p>}

        <input type="text" {...register("email")} className={css.profileInfo} />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="tel"
          placeholder="+44"
          {...register("phone")}
          className={css.profileInfo}
        />
        {errors.phone && <p>{errors.phone.message}</p>}

        <Button
          className={css.saveButton}
          type="submit"
          disabled={avatarMutation.isPending || updateProfileMutation.isPending}
        >
          Save changes
        </Button>
      </form>
    </div>
  );
};
