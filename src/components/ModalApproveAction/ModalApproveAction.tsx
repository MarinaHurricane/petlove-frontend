import css from './ModalApproveAction.module.css';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../lib/store/authStore';
import { useQueryClient } from '@tanstack/react-query';
import cat from '../../assets/cat.png'
import { Button } from '../Button/Button';
import { logoutUser } from '../../lib/api/auth';
import { useState } from 'react';

export const ModalApproveAction = ({onClose}) => {
    const setUser = useAuthStore((state) => state.setUser)
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
      const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.clear();
          setUser(null);
          navigate("/");
        },
      });

   
    return (
        <>
        <div className={css.imgWrapper}>
            <img src={cat} alt="cat image" />
        </div>
        <p className={css.paragraph}>Already leaving?</p>
        <div className={css.buttonsWrapper}>
             <Button onClick={() => logoutMutation.mutate()}>Yes</Button>
        <Button className={css.cancelBtn} onClick={onClose}>Cancel</Button>
        </div>
       
        </>

    )
}