import css from "./ModalEditUser.module.css";
import { useAuthStore } from "../../lib/store/authStore";
import { Icon } from "../Icon/Icon";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { editUserAvatar, updateProfile } from "../../lib/api/user";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

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
})
});

// type EditProfileFormProps = {
//   user: User;
//   onUpdateProfile: (data: EditProfileValues) => Promise<User>;
//   onUpdateAvatar: (formData: FormData) => Promise<User>;
// };

export const ModalEditUser = ({ onClose }) => {
  const {user} = useAuthStore();
  const setUser = useAuthStore((state) => state.setUser)
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    //   phone: "+44",
    //   phone: user.phone || "",
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
  if(!avatar) return;
    try{
setPreview(URL.createObjectURL(avatar));
avatarMutation.mutate(avatar);
} catch(error) {
        console.log(error);
    }

};


  if (!user) return null;

  return (
    <>
      <p className={css.editParagraph}>Edit information</p>
      <img src={preview || user?.avatar} alt="user-avatar" className={css.avatar} />

      <form onSubmit={handleSubmit(onSubmit)}>
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

        <input type="text" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}

        <input type="text" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}

        <input type="tel" placeholder="+44"{...register("phone")} />
        {errors.phone && <p>{errors.phone.message}</p>}

        <button type="submit"
        // disabled={
        //     editAvatarMutation.isPending ||
        //     editProfileMutation.isPending
        // }
        >Save changes</button>
      </form>
    </>
  );
};

// import css from './ModalEditUser.module.css'
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import { useAuthStore } from "../../lib/store/authStore";
// import { editUserAvatar, updateProfile } from "../../lib/api/user";

// type EditProfileForm = {
//   name: string;
//   email: string;
//   phone?: string;
// };

// export const ModalEditUser = () => {
//   const { user, setUser } = useAuthStore();

//   const [preview, setPreview] = useState(user?.avatar || "");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<EditProfileForm>({
//     defaultValues: {
//       name: user?.name,
//       email: user?.email,
//       phone: user?.phone,
//     },
//   });

//   const editAvatarMutation = useMutation({
//     mutationFn: editUserAvatar,

//     onSuccess: (data) => {
//       console.log(data);
//       if (!user) return;

//       // const updatedUser = {
//       //   ...user,
//       //   avatar: data,
//       // };

//          const updatedUser = {
//         ...user,
//         avatar: data.url,
//       };

//       setUser(updatedUser);
//       setPreview(data.url);
//     },

//     onError: (error) => {
//       console.log(error);
//     },
//   });

//   const editProfileMutation = useMutation({
//     mutationFn: updateProfile,

//     onSuccess: (updatedUser) => {
//       setUser(updatedUser);
//     },

//     onError: (error) => {
//       console.log(error);
//     },
//   });

//   const handleAvatarChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     setPreview(URL.createObjectURL(file));

//     editAvatarMutation.mutate(file);
//   };

//   const onSubmit = (data: EditProfileForm) => {
//     editProfileMutation.mutate(data);
//   };

//   return (
//     <>
//       <p>Edit information</p>

//       <img
//         src={preview || user?.avatar}
//         alt="avatar"
//       />

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <label htmlFor="avatar">
//           Upload photo
//         </label>

//         <input
//           id="avatar"
//           type="file"
//           accept="image/*"
//           hidden
//           onChange={handleAvatarChange}
//         />

//         <input
//           type="text"
//           {...register("name")}
//         />
//         {errors.name && <p>{errors.name.message}</p>}

//         <input
//           type="email"
//           {...register("email")}
//         />
//         {errors.email && <p>{errors.email.message}</p>}

//         <input
//           type="tel"
//           {...register("phone")}
//         />
//         {errors.phone && <p>{errors.phone.message}</p>}

//         <button
//           type="submit"
//           disabled={
//             editAvatarMutation.isPending ||
//             editProfileMutation.isPending
//           }
//         >
//           Save changes
//         </button>
//       </form>
//     </>
//   );
// }
