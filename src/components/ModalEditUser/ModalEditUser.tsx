import css from './ModalEditUser.module.css';
import { useAuthStore } from '../../lib/store/authStore';
import { Icon } from '../Icon/Icon';
import { useState } from 'react';
import useForm from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { editUserAvatar } from '../../lib/api/user';

type EditProfileValues = {
  name: string;
  email: string;
};

// type EditProfileFormProps = {
//   user: User;
//   onUpdateProfile: (data: EditProfileValues) => Promise<User>;
//   onUpdateAvatar: (formData: FormData) => Promise<User>;
// };

export const ModalEditUser = () => {
    const {user} = useAuthStore();
    const [avatar, setAvatar] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setAvatar(e.target.files[0]);
        }
    }

    // const handleUpload = async() => {
    //     if(file) {
    //         const formData = new FormData();
    //         formData.append('file', file);
    //     // } try{
    //     //     await editUserAvatar()
    //     // }
    // }

    return (
        <>
        <p className={css.editParagraph}>Edit information</p>
        <img src={user.avatar} alt="user-avatar" className={css.avatar}/>
        <input id="file" type="file" accept="image"  className={css.uploadButton}
        onChange={(e) => {
            const file = e.target.files?.[0];
            if(file) {
                setAvatar(file);
            }
        }}
        >
            Upload photo
             <span>
                <Icon name="icon-upload-cloud" className={css.icon}/>

            </span>
        </input>

        </>
    )

    }