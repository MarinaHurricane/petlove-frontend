import css from "./ModalEditUser.module.css";
import { useAuthStore } from "../../lib/store/authStore";
import { Icon } from "../Icon/Icon";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { editUserAvatar, updateProfile } from "../../lib/api/user";
import { yupResolver } from "@hookform/resolvers/yup";
import type { EditUserData } from "../../lib/api/user";
import * as yup from "yup";
import { Button } from "../Button/Button";
import toast from "react-hot-toast";

// type EditProfileValues = {
//   name: string;
//   email: string;
//   phone?: string;
// };

type ModalEditUserProps = {
  onClose: () => void;
};

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email")
    .required("Email is required"),

  phone: yup
    .string()
    .notRequired()
    .matches(/^\+\d{7,15}$/, {
      message: "Phone must start with + and contain 7-15 digits",
      excludeEmptyString: true,
    }),
});

export const ModalEditUser = ({ onClose }: ModalEditUserProps) => {
  const { user } = useAuthStore();
  const setUser = useAuthStore((state) => state.setUser);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
    },
    resolver: yupResolver(schema),
  });

  const avatarMutation = useMutation({
    mutationFn: editUserAvatar,
    onSuccess: (data) => {
      if (!user) return;

      setUser({
        ...user,
        avatar: data.url,
      });
    },
    onError: () => {
      toast.error("Failed to upload photo");
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      setUser(data);
      onClose();
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  const onSubmit = (data: EditProfileValues) => {
    updateProfileMutation.mutate(data);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const avatar = e.target.files?.[0];
    if (!avatar) return;

    if (!avatar.type.startsWith("image/")) {
      toast.error("Please select an image");
      return;
    }

    if (avatar.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB");
      return;
    }

    const previewUrl = URL.createObjectURL(avatar);
    setPreview(previewUrl);

    avatarMutation.mutate(avatar);
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  if (!user) return null;

  return (
    <div className={css.editWrapper}>
      <h2 className={css.editParagraph}>Edit information</h2>
      <img
        src={preview || user.avatar}
        alt={`${user.name}'s avatar`}
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
          placeholder="+441234567890"
          {...register("phone")}
          className={css.profileInfo}
        />
        {errors.phone && <p>{errors.phone.message}</p>}

        <Button
          className={css.saveButton}
          type="submit"
          disabled={avatarMutation.isPending || updateProfileMutation.isPending}
        >
          {avatarMutation.isPending || updateProfileMutation.isPending
            ? "Saving changes..."
            : "Save changes"}
        </Button>
      </form>
    </div>
  );
};
