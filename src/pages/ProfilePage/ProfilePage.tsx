import css from "./ProfilePage.module.css";
import { useAuthStore } from "../../lib/store/authStore";
import { UserBlock } from "../../components/UserBlock/UserBlock";
import { useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { ModalEditUser } from "../../components/ModalEditUser/ModalEditUser";
import { PetsList } from "../../components/PetList/PetList";
import { Button } from "../../components/Button/Button";
import { getUserInfo } from "../../lib/api/user";
import { useQuery } from "@tanstack/react-query";
import { PetModalInfo } from "../../components/PetModalInfo/PetModalInfo";
import { AddPetModal } from "../../components/AddPetModal/AddPetModal";
import { UserPet } from "../../components/UserPet/UserPet";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const { user, isAuthenticated } = useAuthStore();
  const setUser = useAuthStore((state) => state.setUser);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [mode, setMode] = useState("favorites");
  const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);

  const navigate = useNavigate();

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const openAddPetModalOpen = () => setIsAddPetModalOpen(true);
   const closeAddPetModalOpen = () => setIsAddPetModalOpen(false);

  const handleSelectedPet = (pet) => {
    setSelectedPet(pet);
  };

  const handleToggle = () => {
    if (mode === "favorites") {
      setMode("viewed");
    } else {
      setMode("favorites");
    }

    console.log(mode);
  };

  const handleClosePetModal = () => {
    setIsPetModalOpen(false);
    setSelectedPet(null);
  };

  console.log(user);

      console.log(user?.ownPets[0].avatar);

  const { data: currentUser } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserInfo(user._id),
  });

  console.log(currentUser);
  return (
    <>
      <UserBlock onEditClick={openEditModal} />
      {isEditModalOpen && (
        <Modal onClose={closeEditModal}>
          <ModalEditUser onClose={closeEditModal} />
        </Modal> 
      )}

      <div className={css.myPets}>
        <p className={css.myPetsTitle}>My pets</p>
        <Button className={css.addPet} onClick={() => navigate("/add-pet")}>Add pet</Button>
      </div>

      {isAddPetModalOpen && <Modal onClose={closeAddPetModalOpen}>
        <AddPetModal/>
        </Modal>}



    {currentUser.ownPets.map((pet) => <UserPet key={pet._id} pet={pet}/>)}
    



      <Button onClick={handleToggle}>My favorite pets</Button>
      <Button onClick={handleToggle}>Viewed</Button>

      {mode === "favorites" ? (
        <PetsList
          pets={currentUser?.favorites}
          onPetClick={handleSelectedPet}
          variant="favorites"
        />
      ) : (
        <PetsList
          pets={currentUser?.viewed}
          onPetClick={handleSelectedPet}
          variant="viewed"
        />
      )}
      {selectedPet && (
        <Modal onClose={handleClosePetModal}>
          {mode === "favorites" ? (
            <PetModalInfo pet={selectedPet} variant="favorites" />
          ) : (
            <PetModalInfo pet={selectedPet} variant="viewed" />
          )}
        </Modal>
      )}
      {/* <h1>Profile</h1>
         <img className={css.avatar} src={user.avatar} alt="user-avatar" />
         <p>My information</p>
        <div className={css.profileInfo}>{user.name}</div>
         <div className={css.profileInfo}>{user.email}</div>
          <div className={css.profileInfo}>{user.phone? user.phone : "+44"}</div> */}
    </>
  );
};
