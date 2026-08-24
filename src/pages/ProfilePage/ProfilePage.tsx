import css from "./ProfilePage.module.css";
import { useAuthStore } from "../../lib/store/authStore";
import { UserBlock } from "../../components/UserBlock/UserBlock";
import { useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { ModalEditUser } from "../../components/ModalEditUser/ModalEditUser";
import { PetsList } from "../../components/PetList/PetList";
import { Button } from "../../components/Button/Button";
import { getUserInfo, removePetFromFavorites } from "../../lib/api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PetModalInfo } from "../../components/PetModalInfo/PetModalInfo";
import { UserPet } from "../../components/UserPet/UserPet";
import { useNavigate } from "react-router-dom";
import { deleteUserPet } from "../../lib/api/userPet";
import { Icon } from "../../components/Icon/Icon";
import { LogoutButton } from "../../components/LogoutButton/LogoutButton";
import { Loader } from "../../components/Loader/Loader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import toast from "react-hot-toast";
import { addFavoritePet } from "../../lib/api/petsPage";
import type { Pet } from "../../types/pet";

export const ProfilePage = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const [mode, setMode] = useState<"favorites" | "viewed">("favorites");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const handleSelectedPet = (pet: Pet) => {
    setSelectedPet(pet);
  };

  const handleClosePetModal = () => {
    setSelectedPet(null);
  };

  const handleToggle = () => {
    setMode((prev) => (prev === "favorites" ? "viewed" : "favorites"));
  };

  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });

  const mutation = useMutation({
    mutationFn: deleteUserPet,
    onSuccess: (data) => {
      setUser(data.updatedUser);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: () => {
      toast.error("Failed to delete pet");
    },
  });

  const addFavoriteMutation = useMutation({
    mutationFn: addFavoritePet,
    onSuccess: (data) => {
      setUser(data);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: () => {
      toast.error("Failed to add pet to favorites");
    },
  });

  const removeFromFavoritesMutation = useMutation({
    mutationFn: removePetFromFavorites,
    onSuccess: (data) => {
      setUser(data);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: () => {
      toast.error("Failed to remove pet from favorites");
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage />;

  return (
    <section className={css.profilePage}>
      <div className={css.userBlockWrapper}>
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
            <Icon name="icon-plus" className={css.icon} />
          </Button>
        </div>

        <ul className={css.userPetsList}>
          {currentUser?.ownPets.length === 0 ? (
            <p className={css.noPetsNotice}>Add your own pets</p>
          ) : (
            currentUser?.ownPets?.map((pet) => (
              <UserPet
                key={pet._id}
                pet={pet}
                onPetDelete={() => mutation.mutate(pet._id)}
              />
            ))
          )}
        </ul>

        <LogoutButton />
      </div>

      <div className={css.userPetsBlock}>
        <div className={css.toggle}>
          <Button
            className={
              mode === "favorites" ? css.toggleFavorite : css.toggleViewed
            }
            onClick={handleToggle}
          >
            My favorite pets
          </Button>
          <Button
            className={
              mode === "viewed" ? css.toggleFavorite : css.toggleViewed
            }
            onClick={handleToggle}
          >
            Viewed
          </Button>
        </div>

        {currentUser?.favorites.length === 0 && mode === "favorites" && (
          <p className={css.noticeParagraph}>
            Oops,
            <span className={css.notice}>looks like there aren't any pets</span>
            on this list yet. Do not worry! View the pets on the "find your
            favorite pet" page and add them to your favorites.
          </p>
        )}
        {currentUser?.viewed.length === 0 && mode === "viewed" && (
          <p className={css.noticeParagraph}>
            Oops,
            <span className={css.notice}>
              looks like you haven't viewed any pets yet.
            </span>
            Explore the "Find your favorite pet" page and discover some adorable
            companions!
          </p>
        )}

        <PetsList
          variant={mode}
          pets={
            mode === "favorites"
              ? (currentUser?.favorites ?? [])
              : (currentUser?.viewed ?? [])
          }
          onPetClick={handleSelectedPet}
          onFavClick={(petId) => addFavoriteMutation.mutate(petId)}
          onFavoriteDelete={(petId) => {
            removeFromFavoritesMutation.mutate(petId);
          }}
        />
      </div>

      {selectedPet && (
        <Modal onClose={handleClosePetModal}>
          <PetModalInfo pet={selectedPet} onClose={handleClosePetModal} />
        </Modal>
      )}
    </section>
  );
};
