import css from "./ProfilePage.module.css";
import { useAuthStore } from "../../lib/store/authStore";
import { UserBlock } from "../../components/UserBlock/UserBlock";
import { useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { ModalEditUser } from "../../components/ModalEditUser/ModalEditUser";
import { PetsList } from "../../components/PetList/PetList";
import { Button } from "../../components/Button/Button";
import { getUserInfo, removePetFromFavorites } from "../../lib/api/user";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { PetModalInfo } from "../../components/PetModalInfo/PetModalInfo";
import { AddPetModal } from "../../components/AddPetModal/AddPetModal";
import { UserPet } from "../../components/UserPet/UserPet";
import { useNavigate } from "react-router-dom";
import { deleteUserPet } from "../../lib/api/userPet";

export const ProfilePage = () => {
  const { user, isAuthenticated } = useAuthStore();
  const setUser = useAuthStore((state) => state.setUser);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [mode, setMode] = useState("favorites");
  const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
  };

  const handleClosePetModal = () => {
    setIsPetModalOpen(false);
    setSelectedPet(null);
  };

  console.log(user);

  const { data: currentUser } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserInfo(user._id),
  });

  console.log(currentUser);

  const mutation = useMutation({
    mutationFn: deleteUserPet,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      setUser(data.updatedUser);
      console.log(user);
    },
    onError: () => setError("Adding pet failed, please try again"),
  });

  const favoritesMutation = useMutation({
    mutationFn: removePetFromFavorites,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"]
      });
      setUser(data);
    }
  })

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
        <Button className={css.addPet} onClick={() => navigate("/add-pet")}>
          Add pet
        </Button>
      </div>

      {isAddPetModalOpen && (
        <Modal onClose={closeAddPetModalOpen}>
          <AddPetModal />
        </Modal>
      )}

      {currentUser?.ownPets?.map((pet) => (
        <UserPet
          key={pet._id}
          pet={pet}
          onPetDelete={() => mutation.mutate(pet._id)}
        />
      ))}

      <Button onClick={handleToggle}>My favorite pets</Button>
      <Button onClick={handleToggle}>Viewed</Button>

      {mode === "favorites" ? (
        <PetsList
          pets={currentUser?.favorites}
          onPetClick={handleSelectedPet}
          variant="favorites"
          onFavoriteDelete={(pet) => {
            console.log(pet);
            favoritesMutation.mutate(pet)
          }}
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
