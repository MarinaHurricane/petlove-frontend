import { api } from "./axios"

// export const editUserAvatar = async(avatar) => {
//     const formData = new FormData();
//     formData.append("avatar", avatar);
//     try{
//   const {data} = await api.patch("/user/me/avatar", formData);
//   console.log(data.url);
//     return data.url;
//     } catch(error) {
//         console.log(error.message);
//     }
  
// }

// export const editUserAvatar = async (file) => {

//     try{
//           const formData = new FormData();

//   formData.append("avatar", file);
//   console.log(formData);
// //   console.log(file);
//   for (const [key, value] of formData.entries()) {
//   console.log(key, value);
// }

//   const {data}  = await api.patch(
//     "/user/me/avatar",
//     formData
//   );



//   console.log("DATA:", data);
//   console.log(data.data);

//   return data;

//     } catch(error) {
//         console.log(error);
//     }

// };

export const editUserAvatar = async (file) => {
  try {
    const formData = new FormData();

    formData.append("avatar", file);

    const { data } = await api.patch(
      "/user/me/avatar",
      formData
    );

    console.log("DATA:", data);

    return data;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateProfile = async(editData) => {

    try{
 const {data} = await api.patch("/user/me", editData);
    return data;
    } catch(error) {
        console.log(error);
    }
   
}