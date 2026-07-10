import css from './ProfilePage.module.css';
import { useAuthStore } from '../../lib/store/authStore';
import { UserBlock } from '../../components/UserBlock/UserBlock';
import { useState } from 'react';
import { Modal } from '../../components/Modal/Modal';
import { ModalEditUser } from '../../components/ModalEditUser/ModalEditUser';
import { PetsList } from '../../components/PetList/PetList';
import { Button } from '../../components/Button/Button';

export const ProfilePage = () => {
    const {user, isAuthenticated} = useAuthStore();
    const setUser = useAuthStore((state) => state.setUser);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);
    const [isPetModalOpen, setIsPetModalOpen] = useState(false);

    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    const handleSelectedPet = (pet) => {
        setSelectedPet(pet);
    }

    const handleClosePetModal = () => {
        setIsPetModalOpen(false);
        setSelectedPet(null);
    }
    return (
        <>
        <UserBlock onEditClick={openEditModal}/>
        {isEditModalOpen && (
            <Modal onClose={closeEditModal}>
                <ModalEditUser onClose={closeEditModal}/>
            </Modal>
        )}

        <div className={css.myPets}>
            <p className={css.myPetsTitle}>My pets</p>
            <Button className={css.addPet}>Add pet</Button>
        </div>

        <Button>My favorite pets</Button>

        <PetsList pets={user.favorites} onPetClick={handleSelectedPet} variant="favorites"/>
         {/* <h1>Profile</h1>
         <img className={css.avatar} src={user.avatar} alt="user-avatar" />
         <p>My information</p>
        <div className={css.profileInfo}>{user.name}</div>
         <div className={css.profileInfo}>{user.email}</div>
          <div className={css.profileInfo}>{user.phone? user.phone : "+44"}</div> */}

        </>
      
    )
}